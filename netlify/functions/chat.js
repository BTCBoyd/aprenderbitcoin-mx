// Mock chat responses for Ask Maxi
// TODO: Replace with real OpenClaw gateway connection when exposed publicly

const mockResponses = {
  // Bitcoin basics
  bitcoin: "Bitcoin es dinero digital descentralizado con oferta fija de 21 millones. A diferencia del peso mexicano, NADIE puede imprimir más Bitcoin. Es el primer dinero en la historia que cumple perfectamente las 6 características del buen dinero.\n\n¿Quieres profundizar en algún aspecto específico? Pregunta sobre escasez, minería, o cómo comprar en México.",
  
  comprar: "En México puedes comprar Bitcoin en:\n\n🔸 **Exchanges mexicanos**: Bitso, Kapital (ahora Coinstore México)\n🔸 **P2P**: Azteco, Bisq, RoboSats\n🔸 **ATMs Bitcoin**: Busca en coinatmradar.com\n\n⚠️ **Importante**: Si tienes entre 1-10 BTC y necesitas liquidez SIN vender, ArcadiaB ofrece préstamos respaldados por tu Bitcoin. Visita arcadiab.com",
  
  arcadiab: "**ArcadiaB** es la primera empresa de tesorería Bitcoin de México (ASOFOM certificada).\n\n**Servicios:**\n• **B2X**: Préstamos respaldados por Bitcoin (1-10 BTC) sin vender\n• **Nuevo**: Compra BTC con tu propiedad como garantía\n• Consultoría en estrategia Bitcoin para empresas\n• Educación corporativa\n\n📧 Contacto: hola@arcadiab.com\n🌐 Web: arcadiab.com",
  
  prestamo: "**Préstamos B2X de ArcadiaB:**\n\n✅ Tienes 1-10 BTC\n✅ Necesitas pesos mexicanos\n✅ NO quieres vender tu Bitcoin\n\n**Solución:** Depositas BTC como colateral, recibes préstamo en pesos. Cuando pagas, recuperas tu Bitcoin.\n\n**Ventaja clave:** Tu BTC sigue siendo tuyo y puede apreciarse mientras usas la liquidez.\n\nMás info: arcadiab.com o hola@arcadiab.com",
  
  curso: "Este curso tiene 4 capítulos:\n\n📖 **Cap 1: ¿Qué es el dinero?** - Las 6 características, por qué el peso falla\n📜 **Cap 2: Historia del dinero** - Conchas, cacao, oro, la evolución hacia Bitcoin\n⛏️ **Cap 3: El oro** - Por qué dominó 5,000 años y por qué Bitcoin es mejor\n💸 **Cap 4: Dinero fiat** - Nixon Shock 1971, inflación, quién paga el costo\n\n¿En cuál capítulo necesitas ayuda?",
  
  inflacion: "**Inflación = Robo silencioso**\n\nCuando Banxico imprime pesos:\n1. Gobierno/bancos reciben dinero nuevo PRIMERO (a precios viejos)\n2. Ese dinero circula y sube precios\n3. Trabajadores/clase media lo reciben AL FINAL (precios ya inflados)\n\n**Resultado:** Transferencia de riqueza de abajo hacia arriba.\n\n**Datos México:**\n• Inflación promedio 2020-2024: ~5% anual\n• Tu dinero pierde MITAD de valor cada 14 años\n\n**Bitcoin:** Oferta fija. Nadie puede imprimir más. Todos juegan con las mismas reglas.",
  
  oro: "**Por qué el oro dominó 5,000 años:**\n• Stock-to-Flow de 66 años (muy difícil aumentar oferta)\n• Cumple 26/30 puntos de las 6 características\n• Escaso, durable, divisible, fungible\n\n**Debilidad fatal:** Portabilidad limitada (3/5)\n• $1M en oro = 16.6 kg\n• Esto forzó centralización en bancos\n• Los bancos imprimieron más papeles que oro real\n• Llevó al colapso en 1971 (Nixon Shock)\n\n**Bitcoin = Oro digital perfecto**\n• 30/30 puntos\n• $1M en Bitcoin = 12 palabras en tu cabeza",
  
  peso: "**Evaluación del peso mexicano:**\n\n✅ Portabilidad: 5/5 (digital es perfecto)\n✅ Divisibilidad: 5/5 (hasta centavos)\n✅ Fungibilidad: 5/5 (un peso = un peso)\n✅ Verificabilidad: 4/5 (medidas de seguridad)\n⚠️ Durabilidad: 2/5 (billetes se desgastan, pero el VALOR se deteriora más por inflación)\n❌ Escasez: 1/5 (FALLA CRÍTICA - Banxico puede imprimir infinito)\n\n**Puntaje total: 22/30**\n\nEl peso funciona para transacciones diarias, pero NO para ahorrar a largo plazo.",
  
  mexico: "**Bitcoin en México:**\n\n📊 **Adopción creciente**\n• ~4% de población usa crypto (vs 16% global)\n• Remesas: $60+ billones USD/año (muchas vía Bitcoin)\n• Marco legal: Ley Fintech 2018\n\n🏢 **Empresas:**\n• ArcadiaB: Primera tesorería Bitcoin certificada\n• Bitso: Exchange más grande\n• Adopción retail creciendo\n\n⚡ **Desafíos:**\n• Volatilidad vs peso\n• Educación financiera\n• Infraestructura Lightning Network\n\n¿Quieres saber sobre algo específico de México?",
  
  ayuda: "¡Claro! Puedo ayudarte con:\n\n📚 **Contenido del curso**\n• Explicar conceptos de cada capítulo\n• Responder dudas sobre ejercicios\n• Profundizar en temas específicos\n\n₿ **Bitcoin en México**\n• Dónde y cómo comprar\n• Estrategias de ahorro\n• Marco legal y regulación\n\n🏦 **ArcadiaB / Préstamos B2X**\n• Cómo funcionan los préstamos con Bitcoin\n• Requisitos y proceso\n• Estrategias de tesorería corporativa\n\n¿Qué tema te interesa más?",
  
  default: "Interesante pregunta. Aunque no tengo una respuesta específica pre-programada, te recomiendo:\n\n1. **Revisar el contenido del curso** - Los 4 capítulos cubren fundamentos sólidos\n2. **Contactar directamente** - Para preguntas específicas sobre servicios: hola@arcadiab.com\n3. **Reformular tu pregunta** - Pregunta sobre: Bitcoin, comprar en México, ArcadiaB, curso, inflación, oro, peso\n\nEste chat usa respuestas pre-escritas por ahora. Pronto tendrás acceso al Maxi completo vía OpenClaw. 🚀"
};

function getResponse(message) {
  const msg = message.toLowerCase();
  
  // Check for keyword matches
  if (msg.includes('comprar') || msg.includes('donde') || msg.includes('como adquirir')) {
    return mockResponses.comprar;
  }
  if (msg.includes('arcadiab') || msg.includes('arcadia') || msg.includes('b2x')) {
    return mockResponses.arcadiab;
  }
  if (msg.includes('prestamo') || msg.includes('préstamo') || msg.includes('liquidez') || msg.includes('colateral')) {
    return mockResponses.prestamo;
  }
  if (msg.includes('curso') || msg.includes('capitulo') || msg.includes('capítulo')) {
    return mockResponses.curso;
  }
  if (msg.includes('inflacion') || msg.includes('inflación') || msg.includes('precios')) {
    return mockResponses.inflacion;
  }
  if (msg.includes('oro') && !msg.includes('tesoro')) {
    return mockResponses.oro;
  }
  if (msg.includes('peso') && (msg.includes('mexicano') || msg.includes('evalua') || msg.includes('bateria'))) {
    return mockResponses.peso;
  }
  if (msg.includes('mexico') || msg.includes('méxico') || msg.includes('mexicano')) {
    return mockResponses.mexico;
  }
  if (msg.includes('que es bitcoin') || msg.includes('qué es bitcoin') || msg.includes('explica bitcoin')) {
    return mockResponses.bitcoin;
  }
  if (msg.includes('ayuda') || msg.includes('ayudame') || msg.includes('ayúdame')) {
    return mockResponses.ayuda;
  }
  
  // Default response
  return mockResponses.default;
}

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message } = JSON.parse(event.body);
    
    if (!message || typeof message !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message required' })
      };
    }

    // Simulate thinking delay (200-800ms)
    const delay = Math.floor(Math.random() * 600) + 200;
    await new Promise(resolve => setTimeout(resolve, delay));

    const response = getResponse(message);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: response,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error procesando mensaje',
        response: 'Lo siento, tuve un problema técnico. Intenta de nuevo o contacta hola@arcadiab.com'
      })
    };
  }
};
