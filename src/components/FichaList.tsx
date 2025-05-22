import React from 'react';
import Image from 'next/image';
import { FichaLeitura } from '../types';

interface FichaListProps {
  fichas: FichaLeitura[];
}

const FichaList: React.FC<FichaListProps> = ({ fichas }) => {
  return (
    <div>
      <h2>Fichas de Leitura</h2>
      <ul>
        {fichas.map((ficha, index) => (
          <li key={index}>
            <h3>{ficha.titulo}</h3>
            <p><strong>Autor:</strong> {ficha.autor}</p>
            <p>{ficha.resumo}</p>
            {ficha.imagens.length > 0 && (
              <div>
                {ficha.imagens.map((imagem, imgIndex) => (
                  <div key={imgIndex}>
                    <Image src={imagem.src} alt={imagem.legenda} width={400} height={300} style={{maxWidth:'100%',height:'auto'}} />
                    <p>{imagem.legenda}</p>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FichaList;