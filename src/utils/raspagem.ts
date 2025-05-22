import axios from 'axios';
import { load } from 'cheerio';
import { formatarData } from '@/utils/formatarData';
const data = new Date();
const dataFormatada = formatarData(data);

async function rasparTodasPaginasBusca(query: string, todasPaginas: boolean = false) {
  let pagina = 1;
  const resultados: { titulo: string; url: string }[] = [];
  const urlsSet = new Set();
  const encodedQuery = encodeURIComponent(query);
  while (true) {
    const url = pagina === 1
      ? `https://www.todamateria.com.br/?s=${encodedQuery}`
      : `https://www.todamateria.com.br/page/${pagina}/?s=${encodedQuery}`;
    const { data: html } = await axios.get(url);
    const $ = load(html);
    let encontrou = false;
    $('a.card-item').each((_, el) => {
      let href = $(el).attr('href');
      const titulo = $(el).find('.card-title').text().trim() || $(el).attr('title') || '';
      if (href && href.startsWith('/')) {
        href = 'https://www.todamateria.com.br' + href;
      }
      if (
        href &&
        titulo.length > 0 &&
        !urlsSet.has(href)
      ) {
        resultados.push({ titulo, url: href });
        urlsSet.add(href);
        encontrou = true;
      }
    });
    if (!todasPaginas || !encontrou) break;
    pagina++;
  }
  return resultados;
}

async function rasparConteudoPagina(url: string) {
  try {
    const { data: html } = await axios.get(url);
    const $ = load(html);
    const titulo = $('h1').first().text().trim();
    const paragrafos: string[] = [];
    const linksSet = new Set<string>();
    const imagens: { src: string; legenda: string }[] = [];
    $('figure').each((_, fig) => {
      const img = $(fig).find('img').first();
      let src = img.attr('src') || '';
      if (src && src.startsWith('/')) src = 'https://www.todamateria.com.br' + src;
      const legenda = $(fig).find('figcaption').text().trim();
      if (src) imagens.push({ src, legenda });
    });
    $('.main-content article img, .main-content .content img, article .content img, article img').each((_, img) => {
      let src = $(img).attr('src') || '';
      if (src && src.startsWith('/')) src = 'https://www.todamateria.com.br' + src;
      if (src && !imagens.some(im => im.src === src)) {
        imagens.push({ src, legenda: '' });
      }
    });
    $('.main-content article p, .main-content .content p, article .content p, article p').each((_, el) => {
      const txt = $(el).text().trim();
      if (txt.length > 0) paragrafos.push(txt);
      $(el)
        .find('a[href]')
        .each((_, a) => {
          let href = $(a).attr('href');
          if (href) {
            if (href.startsWith('/')) href = 'https://www.todamateria.com.br' + href;
            if (/^https?:\/\//.test(href)) linksSet.add(href);
          }
        });
    });
    if (paragrafos.length === 0) {
      $('p').each((_, el) => {
        if (
          $(el).parents('.sidebar, .footer, .ad-unit').length === 0 &&
          $(el).text().trim().length > 0
        ) {
          paragrafos.push($(el).text().trim());
          $(el)
            .find('a[href]')
            .each((_, a) => {
              let href = $(a).attr('href');
              if (href) {
                if (href.startsWith('/')) href = 'https://www.todamateria.com.br' + href;
                if (/^https?:\/\//.test(href)) linksSet.add(href);
              }
            });
        }
      });
    }
    let imagem = '';
    if (imagens.length > 0) {
      imagem = imagens[0].src;
    } else {
      const imgEl = $('.main-content article img, .main-content .content img, article .content img, article img').first();
      if (imgEl && typeof imgEl.attr('src') === 'string') {
        imagem = imgEl.attr('src') || '';
        if (imagem && imagem.startsWith('/')) {
          imagem = 'https://www.todamateria.com.br' + imagem;
        }
      }
    }
    let autor =
      $('.author-article--b__info__name').first().text().trim() ||
      $('.autor, .author, .author-name').first().text().trim() ||
      '';
    if (!autor) {
      $('script[type="application/ld+json"]').each((_, el) => {
        try {
          const json = JSON.parse($(el).html() || '{}');
          if (json && typeof json === 'object') {
            if (json.author && typeof json.author === 'object') {
              if (typeof json.author.name === 'string') autor = json.author.name;
              else if (Array.isArray(json.author) && json.author[0]?.name) autor = json.author[0].name;
            } else if (json.name && typeof json.name === 'string') {
              autor = json.name;
            }
          }
        } catch {}
      });
    }
    let citacao = '';
    const citeCopy = $('#cite-copy .citation');
    if (citeCopy.length > 0) {
      citacao = citeCopy.text().trim();
    }
    citacao = citacao + ` ${dataFormatada}`;
    return {
      url,
      titulo,
      conteudo: paragrafos.join('\n\n'),
      imagens,
      autor,
      citacao
    };
  } catch {
    return { url, titulo: '', conteudo: '', imagens: [], autor: '', citacao: '', erro: true };
  }
}

export { rasparTodasPaginasBusca, rasparConteudoPagina };
