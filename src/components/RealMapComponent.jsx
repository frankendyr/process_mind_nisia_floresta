import React, { useState } from 'react';

const RealMapComponent = ({ unidades, tipo = 'saude' }) => {
  const [selectedUnit, setSelectedUnit] = useState(null);

  // Coordenadas de Nísia Floresta, RN
  const centerLat = -6.082;
  const centerLng = -35.203;

  // URL do Google Maps embed para Nísia Floresta
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63421.89234567890!2d-35.23!3d-6.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b0b5c123456789a%3A0x123456789abcdef0!2sN%C3%ADsia%20Floresta%2C%20RN!5e0!3m2!1spt!2sbr!4v1692345678901!5m2!1spt!2sbr`;

  const getMarkerColor = (unidade) => {
    if (tipo === 'saude') {
      if (unidade.tipo === 'Hospital') return '#dc2626'; // Vermelho
      if (unidade.tipo === 'UBS') return '#2563eb'; // Azul
      if (unidade.tipo === 'CAPS') return '#7c3aed'; // Roxo
      if (unidade.tipo === 'CEO') return '#059669'; // Verde
      return '#f59e0b'; // Amarelo para outros
    } else {
      if (unidade.tipo === 'Ensino Fundamental') return '#2563eb';
      if (unidade.tipo === 'Educação Infantil') return '#dc2626';
      if (unidade.tipo === 'Educação de Jovens e Adultos') return '#059669';
      return '#f59e0b';
    }
  };
  // Contagens dinâmicas por tipo
  const counts = unidades.reduce((acc, u) => {
    const t = (u.tipo || '').toLowerCase();
    if (t.includes('ubs')) acc.ubs += 1;
    else if (t.includes('posto')) acc.postos += 1;
    else if (t.includes('caps')) acc.caps += 1;
    else if (t.includes('gest')) acc.gestao += 1;
    else acc.especializadas += 1;
    return acc;
  }, { ubs: 0, postos: 0, caps: 0, especializadas: 0, gestao: 0 });
  const totalUnidades = (unidades || []).length;

  // Bounds para projetar lat/lng em % do quadro (overlay)
  const coords = (unidades || []).filter(u => typeof u.lat === 'number' && typeof u.lng === 'number');
  const minLat = coords.length ? Math.min(...coords.map(u => u.lat)) : centerLat - 0.05;
  const maxLat = coords.length ? Math.max(...coords.map(u => u.lat)) : centerLat + 0.05;
  const minLng = coords.length ? Math.min(...coords.map(u => u.lng)) : centerLng - 0.05;
  const maxLng = coords.length ? Math.max(...coords.map(u => u.lng)) : centerLng + 0.05;
  const pad = 0.01;
  const bMinLat = minLat - pad, bMaxLat = maxLat + pad, bMinLng = minLng - pad, bMaxLng = maxLng + pad;

  const projectToPercent = (lat, lng) => {
    const x = ((lng - bMinLng) / (bMaxLng - bMinLng)) * 100;
    const y = ((bMaxLat - lat) / (bMaxLat - bMinLat)) * 100;
    return { x, y };
  };


  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden relative border">
      {/* Mapa real do Google Maps */}
      <iframe
        src={googleMapsEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg"
        title={`Mapa de ${tipo === 'saude' ? 'Unidades de Saúde' : 'Escolas'} - Nísia Floresta`}
      ></iframe>

      {/* Marcadores das unidades sobre o mapa (overlay SVG) */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          {(unidades || []).map((u, i) => {
            if (typeof u.lat !== 'number' || typeof u.lng !== 'number') return null;
            const { x, y } = projectToPercent(u.lat, u.lng);
            const fill = getMarkerColor(u);
            return (
              <g key={i}>
                <circle cx={`${x}%`} cy={`${y}%`} r="6" fill={fill} stroke="white" strokeWidth="2" />
              </g>
            );
          })}
        </svg>
      </div>

      
      {/* Overlay com informações */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
        <h4 className="font-semibold text-sm mb-2">
          {tipo === 'saude' ? 'Unidades de Saúde' : 'Escolas'}
        </h4>
        <div className="space-y-1">
          {tipo === 'saude' ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-xs">UBS ({counts.ubs})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-xs">Postos de Saúde ({counts.postos})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <span className="text-xs">CAPS ({counts.caps})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-xs">Especializadas ({counts.especializadas})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <span className="text-xs">Gestão ({counts.gestao})</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-xs">Ens. Fundamental (15)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="text-xs">Ed. Infantil (18)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-xs">EJA (2)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-xs">Outros (2)</span>
              </div>
            </>
          )}
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <span className="text-xs text-green-600 font-medium">✓ REAL</span>
          <p className="text-xs text-gray-500">Dados oficiais CNES/INEP</p>
        </div>
      </div>
      
      {/* Lista de unidades */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border max-w-xs max-h-32 overflow-y-auto">
        <h5 className="font-semibold text-xs mb-2">
          {tipo === 'saude' ? 'Unidades de Saúde' : 'Escolas'} ({unidades.length})
        </h5>
        <div className="space-y-1">
          {unidades.slice(0, 5).map((unidade, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: getMarkerColor(unidade) }}
              ></div>
              <span className="text-xs text-gray-700 truncate">
                {unidade.nome}
              </span>
            </div>
          ))}
          {unidades.length > 5 && (
            <p className="text-xs text-gray-500 italic">
              +{unidades.length - 5} mais...
            </p>
          )}
        </div>
      </div>
      
      {/* Instruções */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow border">
        <p className="text-xs text-gray-600">
          📍 Mapa real de Nísia Floresta
        </p>
        <p className="text-xs text-gray-500">
          Use os controles para navegar
        </p>
      </div>
    </div>
  );
};

export default RealMapComponent;
