import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, 
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { ArrowUp, ArrowDown, ExternalLink, Search, Filter, RefreshCw, Award, Target, Activity, Compass, DollarSign, Users, UserCheck, BarChart2 } from 'lucide-react';

// Define colors
const colors = {
  primary: '#009CE0',
  secondary: '#64CCC5',
  accent: '#FF7F50',
  success: '#35D073',
  warning: '#FFB84C',
  danger: '#FF6969',
  neutral: '#455A64',
  light: '#f5f9fc',
  dark: '#263238'
};

const competitors = [
  { id: 'ef', name: 'EF Education First', color: '#EF476F' },
  { id: 'inter', name: 'Inter Cultura', color: '#FFD166' },
  { id: 'iter', name: 'ITER', color: '#06D6A0' },
  { id: 'language', name: 'LANGUAGE TEAM', color: '#118AB2' },
  { id: 'training', name: 'Training Experience', color: '#073B4C' }
];

// Custom Tabs Component
const CustomTabs = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="container mx-auto px-6 py-6 flex-grow">
      <div className="flex bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        {children.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 text-center cursor-pointer flex items-center ${activeTab === index ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div>{children[activeTab].content}</div>
    </div>
  );
};

// Main Dashboard Component
const GiocamondoDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCompetitors, setSelectedCompetitors] = useState(['ef', 'inter', 'iter']);
  const [ageFilter, setAgeFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  // Dashboard content
  const renderDashboardTab = () => (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="font-medium text-gray-700 mb-3">Filtri</div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Età:</label>
            <select 
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="border rounded p-1.5 text-sm"
            >
              <option value="all">Tutte</option>
              <option value="6-10">6-10 anni</option>
              <option value="11-14">11-14 anni</option>
              <option value="15-18">15-18 anni</option>
              <option value="18+">18+</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Programma:</label>
            <select 
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="border rounded p-1.5 text-sm"
            >
              <option value="all">Tutti</option>
              <option value="summer">Summer Camp</option>
              <option value="study">Viaggi Studio</option>
              <option value="highschool">High School Program</option>
              <option value="school">Turismo Scolastico</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Prezzo:</label>
            <select 
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border rounded p-1.5 text-sm"
            >
              <option value="all">Tutti</option>
              <option value="0-1000">0-1.000€</option>
              <option value="1000-2000">1.000-2.000€</option>
              <option value="2000-3000">2.000-3.000€</option>
              <option value="3000+">3.000€+</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Competitor:</label>
            <div className="flex space-x-1">
              {competitors.map(comp => (
                <button 
                  key={comp.id}
                  onClick={() => {
                    if (selectedCompetitors.includes(comp.id)) {
                      setSelectedCompetitors(selectedCompetitors.filter(id => id !== comp.id));
                    } else {
                      setSelectedCompetitors([...selectedCompetitors, comp.id]);
                    }
                  }}
                  className={`px-2 py-1 text-xs rounded ${selectedCompetitors.includes(comp.id) ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  {comp.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Map Component */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-gray-700 mb-3">Mappa Destinazioni</div>
          <div className="h-96">
            <DestinationMap />
          </div>
        </div>

        {/* Brand Comparison */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-gray-700 mb-3">Confronto Brand</div>
          <div className="h-96">
            <BrandComparisonRadar />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Service Comparison */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-gray-700 mb-3">Comparatore Servizi</div>
          <ServiceComparator competitors={competitors.filter(c => selectedCompetitors.includes(c.id))} />
        </div>

        {/* SWOT Analysis */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-gray-700 mb-3">Analisi SWOT</div>
          <SWOTAnalysis />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="font-medium text-gray-700 mb-3">Analisi Sentiment Recensioni</div>
        <SentimentAnalyzer />
      </div>
    </>
  );

  // Define tabs
  const tabs = [
    {
      label: "Dashboard",
      icon: <Activity size={18} className="mr-2" />,
      content: renderDashboardTab()
    },
    {
      label: "Analisi Opportunità",
      icon: <Compass size={18} className="mr-2" />,
      content: <MarketOpportunityFinder />
    },
    {
      label: "SEO & Digital",
      icon: <Search size={18} className="mr-2" />,
      content: <DigitalPresenceOptimizer />
    },
    {
      label: "Strategie Pricing",
      icon: <DollarSign size={18} className="mr-2" />,
      content: <PricingStrategySimulator />
    },
    {
      label: "Customer Journey",
      icon: <Users size={18} className="mr-2" />,
      content: <CustomerJourneyVisualizer />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-blue-600">Giocamondo</div>
            <div className="text-xl font-medium text-gray-600">Competitive Intelligence</div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <RefreshCw size={16} className="mr-2" />
              Aggiorna Dati
            </button>
            <button className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center">
              <ExternalLink size={16} className="mr-2" />
              Esporta Report
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Tabs */}
      <CustomTabs activeTab={activeTab} setActiveTab={setActiveTab}>
        {tabs}
      </CustomTabs>

      {/* Footer */}
      <footer className="bg-white shadow-sm py-4 px-6 mt-auto">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div>Giocamondo Competitive Intelligence Dashboard</div>
          <div>Ultimo aggiornamento: 02/03/2025</div>
        </div>
      </footer>
    </div>
  );
};

// Simple Map Visualization (replacing pigeon-maps)
const DestinationMap = () => {
  const destinations = [
    { name: 'Londra', lat: 51.505, lon: -0.09, company: 'giocamondo', type: 'study', age: '11-18', price: 2290 },
    { name: 'New York', lat: 40.7128, lon: -74.006, company: 'giocamondo', type: 'study', age: '15-18', price: 3150 },
    { name: 'Toronto', lat: 43.6532, lon: -79.3832, company: 'giocamondo', type: 'highschool', age: '15-18', price: 4150 },
    { name: 'Dublino', lat: 53.3498, lon: -6.2603, company: 'giocamondo', type: 'study', age: '11-18', price: 2290 },
    { name: 'Boston', lat: 42.3601, lon: -71.0589, company: 'giocamondo', type: 'highschool', age: '15-18', price: 4150 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503, company: 'ef', type: 'study', age: '15-18', price: 3500 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093, company: 'ef', type: 'study', age: '15-18', price: 3800 },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198, company: 'ef', type: 'study', age: '15-18', price: 3600 },
    { name: 'Berlino', lat: 52.5200, lon: 13.4050, company: 'iter', type: 'study', age: '11-18', price: 2100 },
    { name: 'Praga', lat: 50.0755, lon: 14.4378, company: 'iter', type: 'study', age: '11-18', price: 1950 },
    { name: 'Madrid', lat: 40.4168, lon: -3.7038, company: 'language', type: 'study', age: '11-18', price: 2200 },
    { name: 'Barcellona', lat: 41.3851, lon: 2.1734, company: 'language', type: 'study', age: '11-18', price: 2150 },
    { name: 'Val d\'Aosta', lat: 45.7383, lon: 7.3177, company: 'giocamondo', type: 'summer', age: '6-14', price: 790 },
    { name: 'Toscana', lat: 43.7711, lon: 11.2486, company: 'giocamondo', type: 'summer', age: '6-14', price: 690 },
    { name: 'Abruzzo', lat: 42.3505, lon: 13.3995, company: 'giocamondo', type: 'summer', age: '6-14', price: 590 },
  ];

  const getCompanyColor = (company) => {
    if (company === 'giocamondo') return colors.primary;
    if (company === 'ef') return competitors[0].color;
    if (company === 'inter') return competitors[1].color;
    if (company === 'iter') return competitors[2].color;
    if (company === 'language') return competitors[3].color;
    if (company === 'training') return competitors[4].color;
    return colors.neutral;
  };

  const continents = {
    europe: { 
      title: "Europa", 
      destinations: destinations.filter(d => 
        ['Londra', 'Dublino', 'Berlino', 'Praga', 'Madrid', 'Barcellona', 'Val d\'Aosta', 'Toscana', 'Abruzzo'].includes(d.name)
      ) 
    },
    northAmerica: { 
      title: "America del Nord", 
      destinations: destinations.filter(d => 
        ['New York', 'Toronto', 'Boston'].includes(d.name)
      ) 
    },
    asia: { 
      title: "Asia e Oceania", 
      destinations: destinations.filter(d => 
        ['Tokyo', 'Sydney', 'Singapore'].includes(d.name)
      ) 
    }
  };

  return (
    <div className="h-full overflow-auto">
      {Object.keys(continents).map(continent => (
        <div key={continent} className="mb-4">
          <h3 className="text-sm font-medium mb-2">{continents[continent].title}</h3>
          <div className="grid grid-cols-3 gap-2">
            {continents[continent].destinations.map((dest, idx) => (
              <div 
                key={idx} 
                className="border rounded-lg p-2"
                style={{ borderLeftColor: getCompanyColor(dest.company), borderLeftWidth: 4 }}
              >
                <div className="font-medium text-sm">{dest.name}</div>
                <div className="flex justify-between text-xs mt-1">
                  <span>{dest.type === 'study' ? 'Viaggio Studio' : dest.type === 'highschool' ? 'High School' : 'Summer Camp'}</span>
                  <span className="font-medium">{dest.price}€</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Età: {dest.age}</div>
                <div 
                  className="text-xs mt-1 rounded-full px-2 py-0.5 text-white text-center"
                  style={{ backgroundColor: getCompanyColor(dest.company) }}
                >
                  {dest.company === 'giocamondo' ? 'Giocamondo' : 
                    dest.company === 'ef' ? 'EF' :
                    dest.company === 'inter' ? 'Inter Cultura' :
                    dest.company === 'iter' ? 'ITER' :
                    dest.company === 'language' ? 'Language Team' : 'Training Exp.'}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {['giocamondo', 'ef', 'inter', 'iter', 'language', 'training'].map(company => (
          <div key={company} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: getCompanyColor(company) }}
            ></div>
            <div className="text-xs text-gray-600">
              {company === 'giocamondo' ? 'Giocamondo' : 
               company === 'ef' ? 'EF Education' :
               company === 'inter' ? 'Inter Cultura' :
               company === 'iter' ? 'ITER' :
               company === 'language' ? 'Language Team' : 'Training Exp.'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Brand Comparison Radar Chart
const BrandComparisonRadar = () => {
  const data = [
    { subject: 'Varietà Destinazioni', giocamondo: 7.8, ef: 9.6, inter: 6.8, iter: 5.5, language: 6.2, training: 5.1 },
    { subject: 'Prezzi Competitivi', giocamondo: 6.5, ef: 5.2, inter: 7.0, iter: 7.8, language: 7.2, training: 7.5 },
    { subject: 'Recensioni Cliente', giocamondo: 9.2, ef: 8.6, inter: 8.0, iter: 7.3, language: 8.1, training: 7.9 },
    { subject: 'Presenza Social', giocamondo: 7.5, ef: 9.4, inter: 7.3, iter: 6.2, language: 8.5, training: 6.0 },
    { subject: 'Supporto Cliente', giocamondo: 8.9, ef: 7.8, inter: 8.2, iter: 8.0, language: 7.5, training: 8.1 },
    { subject: 'Innovazione', giocamondo: 8.5, ef: 9.2, inter: 7.5, iter: 6.8, language: 7.2, training: 7.0 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart outerRadius="80%" data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: colors.neutral, fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: colors.neutral, fontSize: 10 }} />
        <Radar name="Giocamondo" dataKey="giocamondo" stroke={colors.primary} fill={colors.primary} fillOpacity={0.4} />
        <Radar name="EF Education First" dataKey="ef" stroke={competitors[0].color} fill={competitors[0].color} fillOpacity={0.3} />
        <Radar name="Inter Cultura" dataKey="inter" stroke={competitors[1].color} fill={competitors[1].color} fillOpacity={0.3} />
        <Radar name="ITER" dataKey="iter" stroke={competitors[2].color} fill={competitors[2].color} fillOpacity={0.3} />
        <Tooltip />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

// Service Comparator Component
const ServiceComparator = ({ competitors }) => {
  const services = [
    { category: 'Programmi', name: 'Summer Camp Tematici', giocamondo: '15+ programmi', ef: '12 programmi', inter: '8 programmi', iter: '5 programmi', language: '10 programmi', training: '4 programmi' },
    { category: 'Programmi', name: 'Viaggi Studio Internazionali', giocamondo: '10 destinazioni', ef: '100+ destinazioni', inter: '15 destinazioni', iter: '8 destinazioni', language: '12 destinazioni', training: '6 destinazioni' },
    { category: 'Programmi', name: 'High School Program', giocamondo: 'Sì (2 destinazioni)', ef: 'Sì (25+ destinazioni)', inter: 'Sì (10+ destinazioni)', iter: 'No', language: 'Limitato', training: 'No' },
    { category: 'Programmi', name: 'Turismo Scolastico', giocamondo: '120+ itinerari', ef: 'Limitato', inter: '50+ itinerari', iter: '30+ itinerari', language: '40+ itinerari', training: 'No' },
    { category: 'Servizi', name: 'Supporto Psicopedagogico', giocamondo: 'Sì (progetto dedicato)', ef: 'Base', inter: 'No', iter: 'No', language: 'No', training: 'No' },
    { category: 'Servizi', name: 'App Mobile Dedicata', giocamondo: 'Sì (funzionalità base)', ef: 'Sì (avanzata)', inter: 'No', iter: 'No', language: 'Sì (base)', training: 'No' },
    { category: 'Servizi', name: 'Certificazione Ambientale', giocamondo: 'ISO 14804', ef: 'Sì', inter: 'No', iter: 'No', language: 'No', training: 'No' },
    { category: 'Pricing', name: 'Pagamento Rateizzato', giocamondo: 'Sì (12 rate)', ef: 'Sì (6 rate)', inter: 'Sì (8 rate)', iter: 'Sì (4 rate)', language: 'Sì (6 rate)', training: 'Sì (3 rate)' },
    { category: 'Pricing', name: 'Programma Referral', giocamondo: 'Sì (bonus 25€)', ef: 'Sì (sconto 10%)', inter: 'Sì (bonus 20€)', iter: 'No', language: 'No', training: 'No' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servizio</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50">Giocamondo</th>
            {competitors.map(comp => (
              <th 
                key={comp.id} 
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ backgroundColor: `${comp.color}10` }}
              >
                {comp.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {services.map((service, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-2 text-sm text-gray-500">{service.category}</td>
              <td className="px-4 py-2 text-sm font-medium text-gray-700">{service.name}</td>
              <td className="px-4 py-2 text-sm text-gray-900 bg-blue-50">{service.giocamondo}</td>
              {competitors.map(comp => (
                <td 
                  key={comp.id} 
                  className="px-4 py-2 text-sm text-gray-900"
                  style={{ backgroundColor: `${comp.color}10` }}
                >
                  {service[comp.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// SWOT Analysis Component
const SWOTAnalysis = () => {
  const swot = {
    strengths: [
      { title: 'Partnership INPS e MIUR', desc: 'Contratti esclusivi per programmi Estate INPSieme' },
      { title: 'Formazione Staff', desc: '200+ ore annuali per direttori e personale' },
      { title: 'Certificazioni', desc: 'ISO 9001 e 14804 per qualità e sicurezza' }
    ],
    weaknesses: [
      { title: 'Presenza Asia limitata', desc: 'Solo 2 destinazioni vs 15 di EF' },
      { title: 'App con funzionalità base', desc: 'Limitata rispetto ai concorrenti internazionali' }
    ],
    opportunities: [
      { title: 'Programmi universitari', desc: 'Gap del 27% nel mercato 18-25 anni' },
      { title: 'Partnership EdTech', desc: 'Integrazione con piattaforme di virtual exchange' }
    ],
    threats: [
      { title: 'Concorrenza pricing', desc: 'Operatori low-cost emergenti' },
      { title: 'Instabilità geopolitica', desc: 'Impatto su destinazioni internazionali tradizionali' }
    ]
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className="bg-green-50 rounded p-3">
        <div className="font-medium text-green-700 mb-2">Punti di forza</div>
        <div className="space-y-2">
          {swot.strengths.map((item, i) => (
            <div key={i} className="bg-white p-2 rounded border border-green-200">
              <div className="font-medium text-sm">{item.title}</div>
              <div className="text-xs text-gray-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-red-50 rounded p-3">
        <div className="font-medium text-red-700 mb-2">Debolezze</div>
        <div className="space-y-2">
          {swot.weaknesses.map((item, i) => (
            <div key={i} className="bg-white p-2 rounded border border-red-200">
              <div className="font-medium text-sm">{item.title}</div>
              <div className="text-xs text-gray-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-50 rounded p-3">
        <div className="font-medium text-blue-700 mb-2">Opportunità</div>
        <div className="space-y-2">
          {swot.opportunities.map((item, i) => (
            <div key={i} className="bg-white p-2 rounded border border-blue-200">
              <div className="font-medium text-sm">{item.title}</div>
              <div className="text-xs text-gray-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-amber-50 rounded p-3">
        <div className="font-medium text-amber-700 mb-2">Minacce</div>
        <div className="space-y-2">
          {swot.threats.map((item, i) => (
            <div key={i} className="bg-white p-2 rounded border border-amber-200">
              <div className="font-medium text-sm">{item.title}</div>
              <div className="text-xs text-gray-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sentiment Analyzer Component
const SentimentAnalyzer = () => {
  const sentimentData = [
    { category: 'Staff', giocamondo: 88, ef: 82, inter: 79, iter: 74, language: 76, training: 72 },
    { category: 'Alloggio', giocamondo: 84, ef: 86, inter: 76, iter: 78, language: 72, training: 70 },
    { category: 'Attività', giocamondo: 92, ef: 88, inter: 84, iter: 80, language: 82, training: 79 },
    { category: 'Sicurezza', giocamondo: 95, ef: 90, inter: 87, iter: 84, language: 86, training: 82 },
    { category: 'Valore', giocamondo: 81, ef: 72, inter: 83, iter: 85, language: 79, training: 81 },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={sentimentData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="category" type="category" width={80} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="giocamondo" name="Giocamondo" fill={colors.primary} />
            <Bar dataKey="ef" name="EF Education" fill={competitors[0].color} />
            <Bar dataKey="inter" name="Inter Cultura" fill={competitors[1].color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <div className="font-medium text-gray-800 mb-2">Trend principali</div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <ArrowUp className="text-green-500 mr-2" size={16} />
              <span className="text-gray-800">Sicurezza: </span>
              <span className="text-gray-600 ml-2">Forte punto di forza per Giocamondo (95%)</span>
            </div>
            <div className="flex items-center text-sm">
              <ArrowUp className="text-green-500 mr-2" size={16} />
              <span className="text-gray-800">Attività: </span>
              <span className="text-gray-600 ml-2">Programmi tematici molto apprezzati (92%)</span>
            </div>
            <div className="flex items-center text-sm">
              <ArrowDown className="text-amber-500 mr-2" size={16} />
              <span className="text-gray-800">Valore: </span>
              <span className="text-gray-600 ml-2">Area di miglioramento (81%)</span>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="font-medium text-gray-800 mb-2">NPS</div>
          <div className="flex items-end space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">78</div>
              <div className="text-sm text-gray-600">Giocamondo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600">73</div>
              <div className="text-sm text-gray-600">Media settore</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Market Opportunity Finder Component
const MarketOpportunityFinder = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-gray-700 mb-3">Gap di Mercato Identificati</div>
          <div className="space-y-4">
            <div className="border rounded-lg p-3 border-blue-200 bg-blue-50">
              <div className="flex items-center">
                <div className="bg-blue-600 p-2 rounded-full text-white mr-3">
                  <Target size={16} />
                </div>
                <div className="font-medium">Segmento 18-25 anni</div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Gap del 27% nel mercato universitario con potenziale di espansione in viaggi formativi specializzati (stage internazionali, corsi università estere)
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-blue-600">Potenziale: <span className="font-medium">Alto</span></div>
                <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs">
                  Dettagli
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg p-3 border-green-200 bg-green-50">
              <div className="flex items-center">
                <div className="bg-green-600 p-2 rounded-full text-white mr-3">
                  <Target size={16} />
                </div>
                <div className="font-medium">Destinazioni asiatiche</div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Solo 2 destinazioni vs 15 di EF Education First. Crescente interesse per Singapore, Corea del Sud e Giappone (+41% ricerche YoY)
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-green-600">Potenziale: <span className="font-medium">Medio</span></div>
                <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-xs">
                  Dettagli
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg p-3 border-purple-200 bg-purple-50">
              <div className="flex items-center">
                <div className="bg-purple-600 p-2 rounded-full text-white mr-3">
                  <Target size={16} />
                </div>
                <div className="font-medium">Programmi STEM</div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Domanda crescente (+29% vs 2023) per programmi scientifici, coding, robotica e sostenibilità ambientale
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-purple-600">Potenziale: <span className="font-medium">Alto</span></div>
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded text-xs">
                  Dettagli
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-gray-700 mb-3">Simulatore Potenziale di Mercato</div>
          <div className="border rounded-lg border-gray-200 p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Tipo di Programma</label>
                <select className="w-full border rounded p-2 text-sm">
                  <option>Programmi Universitari (18-25)</option>
                  <option>Viaggi Studio Asia</option>
                  <option>Camp STEM</option>
                  <option>Micro-soggiorni (3-5 giorni)</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Investimento iniziale</label>
                <select className="w-full border rounded p-2 text-sm">
                  <option>Basso (50-100k €)</option>
                  <option>Medio (100-250k €)</option>
                  <option>Alto (250k+ €)</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Timeframe</label>
                <select className="w-full border rounded p-2 text-sm">
                  <option>Breve (6-12 mesi)</option>
                  <option>Medio (12-24 mesi)</option>
                  <option>Lungo (24+ mesi)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-3 rounded">
              <div className="text-center font-medium mb-2">Risultati Simulazione</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-gray-500">ROI Stimato</div>
                  <div className="text-lg font-medium text-green-600">218%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Potenziale Clienti</div>
                  <div className="text-lg font-medium">5.600+</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Indice Competitivo</div>
                  <div className="text-lg font-medium text-amber-600">Medio</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm">
                Genera Report Dettagliato
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="font-medium text-gray-700 mb-3">Analisi Demografica e Territoriale</div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { age: '6-10', current: 18, potential: 24 },
                  { age: '11-14', current: 42, potential: 46 },
                  { age: '15-18', current: 31, potential: 38 },
                  { age: '18-25', current: 9, potential: 36 }
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="current" name="Quota Attuale" fill={colors.primary} />
                <Bar dataKey="potential" name="Potenziale" fill={colors.accent} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Nord Italia', value: 42, fill: '#6366f1' },
                    { name: 'Centro Italia', value: 35, fill: '#8b5cf6' },
                    { name: 'Sud Italia', value: 16, fill: '#ec4899' },
                    { name: 'Isole', value: 7, fill: '#f43f5e' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  dataKey="value"
                >
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Digital Presence Optimizer Component
const DigitalPresenceOptimizer = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-gray-700 mb-3">SEO Keyword Analysis</div>
          <div className="h-80 overflow-y-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giocamondo</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concorrenti</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gap</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">vacanze studio inglese</td>
                  <td className="px-4 py-2 text-sm text-gray-500">12,500</td>
                  <td className="px-4 py-2 text-sm text-gray-500">#4</td>
                  <td className="px-4 py-2 text-sm text-gray-500">EF (#1), Language Team (#2)</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                      Medio
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">estate inpsieme</td>
                  <td className="px-4 py-2 text-sm text-gray-500">8,300</td>
                  <td className="px-4 py-2 text-sm text-gray-500">#1</td>
                  <td className="px-4 py-2 text-sm text-gray-500">Language Team (#5)</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Basso
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">vacanze studio ragazzi</td>
                  <td className="px-4 py-2 text-sm text-gray-500">7,200</td>
                  <td className="px-4 py-2 text-sm text-gray-500">#6</td>
                  <td className="px-4 py-2 text-sm text-gray-500">EF (#1), Inter Cultura (#2)</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      Alto
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">summer camp italia</td>
                  <td className="px-4 py-2 text-sm text-gray-500">6,800</td>
                  <td className="px-4 py-2 text-sm text-gray-500">#2</td>
                  <td className="px-4 py-2 text-sm text-gray-500">Language Team (#1)</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                      Medio
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">vacanze studio inghilterra</td>
                  <td className="px-4 py-2 text-sm text-gray-500">5,400</td>
                  <td className="px-4 py-2 text-sm text-gray-500">#7</td>
                  <td className="px-4 py-2 text-sm text-gray-500">EF (#1), Language Team (#3)</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      Alto
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">campi estivi bambini</td>
                  <td className="px-4 py-2 text-sm text-gray-500">4,900</td>
                  <td className="px-4 py-2 text-sm text-gray-500">#3</td>
                  <td className="px-4 py-2 text-sm text-gray-500">Language Team (#2)</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                      Medio
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-gray-700 mb-3">Social Media Performance</div>
          <div className="grid grid-cols-1 gap-4">
            <div className="border rounded-lg p-3">
              <div className="flex justify-between items-center mb-3">
                <div className="font-medium text-sm">Engagement Rate</div>
                <div className="text-xs text-gray-500">Ultimi 3 mesi</div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={[
                    { name: 'Gen', giocamondo: 3.2, ef: 4.8, language: 2.7 },
                    { name: 'Feb', giocamondo: 3.8, ef: 4.6, language: 2.9 },
                    { name: 'Mar', giocamondo: 4.5, ef: 4.7, language: 3.1 }
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="giocamondo" name="Giocamondo" stroke={colors.primary} />
                  <Line type="monotone" dataKey="ef" name="EF Education" stroke={competitors[0].color} />
                  <Line type="monotone" dataKey="language" name="Language Team" stroke={competitors[3].color} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="border rounded-lg p-3 bg-gray-50">
              <div className="text-sm font-medium mb-1">Instagram</div>
              <div className="flex justify-between">
                <div>
                  <div className="text-xs text-gray-500">Follower</div>
                  <div className="font-medium">15.6K</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">vs EF</div>
                  <div className="font-medium text-red-600">-82%</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3 bg-gray-50">
              <div className="text-sm font-medium mb-1">Facebook</div>
              <div className="flex justify-between">
                <div>
                  <div className="text-xs text-gray-500">Follower</div>
                  <div className="font-medium">28.3K</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">vs EF</div>
                  <div className="font-medium text-red-600">-64%</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3 bg-gray-50">
              <div className="text-sm font-medium mb-1">TikTok</div>
              <div className="flex justify-between">
                <div>
                  <div className="text-xs text-gray-500">Follower</div>
                  <div className="font-medium">5.2K</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">vs EF</div>
                  <div className="font-medium text-red-600">-91%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="font-medium text-gray-700 mb-3">Website UX/UI Analysis</div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="border rounded-lg p-3">
              <div className="font-medium text-sm mb-2">Performance Metrics</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-600">Velocità di caricamento</div>
                    <div className="text-xs font-medium">3.2s (vs 2.1s EF)</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-600">Mobile-friendliness</div>
                    <div className="text-xs font-medium">78/100 (vs 92/100 EF)</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-600">Usabilità</div>
                    <div className="text-xs font-medium">82/100 (vs 88/100 EF)</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-600">Tasso di conversione</div>
                    <div className="text-xs font-medium">2.8% (vs 3.6% EF)</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-600">Bounce rate</div>
                    <div className="text-xs font-medium">45% (vs 38% EF)</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="border rounded-lg p-3 h-full">
              <div className="font-medium text-sm mb-2">Suggerimenti Migliorativi</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded text-blue-700 mr-2 mt-0.5">1</div>
                  <div>
                    <div className="font-medium">Ottimizzare velocità caricamento mobile</div>
                    <div className="text-xs text-gray-600">Riduzione immagini e implementazione lazy loading</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded text-blue-700 mr-2 mt-0.5">2</div>
                  <div>
                    <div className="font-medium">Migliorare CTA principali</div>
                    <div className="text-xs text-gray-600">Rendere più evidenti i bottoni di conversione</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded text-blue-700 mr-2 mt-0.5">3</div>
                  <div>
                    <div className="font-medium">Implementare chatbot assistenza</div>
                    <div className="text-xs text-gray-600">Per supporto immediato e miglioramento conversioni</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded text-blue-700 mr-2 mt-0.5">4</div>
                  <div>
                    <div className="font-medium">Ottimizzare form di contatto</div>
                    <div className="text-xs text-gray-600">Ridurre i campi richiesti e migliorare UX mobile</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded text-blue-700 mr-2 mt-0.5">5</div>
                  <div>
                    <div className="font-medium">Aggiungere testimonianze genitore/figlio</div>
                    <div className="text-xs text-gray-600">Aumentare social proof con video testimonianze</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pricing Strategy Simulator Component
const PricingStrategySimulator = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-gray-700 mb-3">Simulatore Strategie di Pricing</div>
          <div className="border rounded-lg border-gray-200 p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Destinazione</label>
                <select className="w-full border rounded p-2 text-sm">
                  <option>Londra (UK)</option>
                  <option>Dublino (Irlanda)</option>
                  <option>New York (USA)</option>
                  <option>Toronto (Canada)</option>
                  <option>Summer Camp Italia</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Programma</label>
                <select className="w-full border rounded p-2 text-sm">
                  <option>Explorer</option>
                  <option>Discovery</option>
                  <option>18+</option>
                  <option>Summer Camp</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Prezzo attuale</label>
                <div className="flex items-center">
                  <input type="text" value="2.290" readOnly className="w-full border rounded p-2 text-sm bg-gray-50" />
                  <span className="ml-2">€</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Prezzo medio concorrenza</label>
                <div className="flex items-center">
                  <input type="text" value="2.150" readOnly className="w-full border rounded p-2 text-sm bg-gray-50" />
                  <span className="ml-2">€</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Simulazione nuovo prezzo</label>
                <div className="flex items-center">
                  <input type="range" min="1800" max="2700" step="50" defaultValue="2290" className="w-full" />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1.800€</span>
                  <span>2.700€</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Aggiungere servizi premium</label>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-xs">Assicurazione viaggio premium (+90€)</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-xs">Attività extra (+120€)</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-xs">Supporto psicologico (+70€)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded mb-4">
              <div className="font-medium text-sm mb-1">Prezzo finale simulato: 2.290€</div>
              <div className="text-xs text-gray-600">+6.5% vs media concorrenza</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm">
                Simula Impatto
              </button>
              <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg text-sm">
                Esporta Scenario
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-gray-700 mb-3">Impatto Stimato</div>
          <div className="space-y-4">
            <div className="border rounded-lg p-3">
              <div className="text-sm font-medium mb-2">Volumi di Vendita</div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart
                  data={[
                    { name: 'Attuale', value: 100 },
                    { name: 'Simulato', value: 92 }
                  ]}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={60} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="value" fill={colors.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="border rounded-lg p-3">
              <div className="text-sm font-medium mb-2">Ricavi Totali</div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart
                  data={[
                    { name: 'Attuale', value: 100 },
                    { name: 'Simulato', value: 105 }
                  ]}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, 150]} />
                  <YAxis dataKey="name" type="category" width={60} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="value" fill={colors.success} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="border rounded-lg p-3">
              <div className="text-sm font-medium mb-2">Marginalità</div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart
                  data={[
                    { name: 'Attuale', value: 100 },
                    { name: 'Simulato', value: 112 }
                  ]}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, 150]} />
                  <YAxis dataKey="name" type="category" width={60} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="value" fill={colors.success} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="font-medium text-gray-700 mb-3">Analisi Competitiva Prezzi</div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destinazione</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giocamondo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EF</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inter Cultura</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITER</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LANGUAGE TEAM</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diff. % Media</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">Londra (UK)</td>
                <td className="px-4 py-2 text-sm text-gray-900 font-medium">2.290€</td>
                <td className="px-4 py-2 text-sm text-gray-500">2.450€</td>
                <td className="px-4 py-2 text-sm text-gray-500">2.320€</td>
                <td className="px-4 py-2 text-sm text-gray-500">-</td>
                <td className="px-4 py-2 text-sm text-gray-500">2.190€</td>
                <td className="px-4 py-2 text-sm text-green-600">-1.2%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">Dublino (Irlanda)</td>
                <td className="px-4 py-2 text-sm text-gray-900 font-medium">2.290€</td>
                <td className="px-4 py-2 text-sm text-gray-500">2.380€</td>
                <td className="px-4 py-2 text-sm text-gray-500">2.250€</td>
                <td className="px-4 py-2 text-sm text-gray-500">2.150€</td>
                <td className="px-4 py-2 text-sm text-gray-500">2.120€</td>
                <td className="px-4 py-2 text-sm text-amber-600">+3.8%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">New York (USA)</td>
                <td className="px-4 py-2 text-sm text-gray-900 font-medium">3.150€</td>
                <td className="px-4 py-2 text-sm text-gray-500">3.380€</td>
                <td className="px-4 py-2 text-sm text-gray-500">3.290€</td>
                <td className="px-4 py-2 text-sm text-gray-500">-</td>
                <td className="px-4 py-2 text-sm text-gray-500">3.050€</td>
                <td className="px-4 py-2 text-sm text-green-600">-2.2%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">Toronto (Canada)</td>
                <td className="px-4 py-2 text-sm text-gray-900 font-medium">3.150€</td>
                <td className="px-4 py-2 text-sm text-gray-500">3.250€</td>
                <td className="px-4 py-2 text-sm text-gray-500">3.190€</td>
                <td className="px-4 py-2 text-sm text-gray-500">-</td>
                <td className="px-4 py-2 text-sm text-gray-500">-</td>
                <td className="px-4 py-2 text-sm text-green-600">-2.2%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">Summer Camp Italia</td>
                <td className="px-4 py-2 text-sm text-gray-900 font-medium">690-1.200€</td>
                <td className="px-4 py-2 text-sm text-gray-500">750-1.350€</td>
                <td className="px-4 py-2 text-sm text-gray-500">620-980€</td>
                <td className="px-4 py-2 text-sm text-gray-500">580-950€</td>
                <td className="px-4 py-2 text-sm text-gray-500">650-1.100€</td>
                <td className="px-4 py-2 text-sm text-amber-600">+7.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Customer Journey Visualizer Component
const CustomerJourneyVisualizer = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="font-medium text-gray-700 mb-3">Mappatura Customer Journey</div>
        <div className="relative">
          <div className="absolute top-14 left-0 w-full border-t-2 border-gray-200 z-0"></div>
          <div className="relative z-10 flex justify-between">
            <div className="w-1/5 px-2">
              <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <Search className="text-white" size={20} />
              </div>
              <div className="bg-white border rounded-lg p-3 text-center">
                <div className="font-medium text-sm mb-1">Scoperta</div>
                <div className="text-xs text-gray-600">Ricerca e initial awareness</div>
              </div>
            </div>
            
            <div className="w-1/5 px-2">
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <Filter className="text-white" size={20} />
              </div>
              <div className="bg-white border rounded-lg p-3 text-center">
                <div className="font-medium text-sm mb-1">Considerazione</div>
                <div className="text-xs text-gray-600">Comparazione e valutazione</div>
              </div>
            </div>
            
            <div className="w-1/5 px-2">
              <div className="bg-blue-400 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <DollarSign className="text-white" size={20} />
              </div>
              <div className="bg-white border rounded-lg p-3 text-center">
                <div className="font-medium text-sm mb-1">Acquisto</div>
                <div className="text-xs text-gray-600">Conferma e pagamento</div>
              </div>
            </div>
            
            <div className="w-1/5 px-2">
              <div className="bg-blue-300 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <Award className="text-white" size={20} />
              </div>
              <div className="bg-white border rounded-lg p-3 text-center">
                <div className="font-medium text-sm mb-1">Esperienza</div>
                <div className="text-xs text-gray-600">Fruizione del servizio</div>
              </div>
            </div>
            
            <div className="w-1/5 px-2">
              <div className="bg-blue-200 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <UserCheck className="text-blue-700" size={20} />
              </div>
              <div className="bg-white border rounded-lg p-3 text-center">
                <div className="font-medium text-sm mb-1">Fidelizzazione</div>
                <div className="text-xs text-gray-600">Referral e ripetizione</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-5 gap-2">
          <div className="border-l-4 border-blue-600 pl-2">
            <div className="text-xs font-medium">Touchpoint</div>
            <div className="text-xs text-gray-600 mt-1">• Google/SEO</div>
            <div className="text-xs text-gray-600">• Social Media</div>
            <div className="text-xs text-gray-600">• Passaparola</div>
            <div className="text-xs text-gray-600">• INPS / Welfare</div>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-2">
            <div className="text-xs font-medium">Touchpoint</div>
            <div className="text-xs text-gray-600 mt-1">• Sito web</div>
            <div className="text-xs text-gray-600">• PDF/Brochure</div>
            <div className="text-xs text-gray-600">• Video presentazioni</div>
            <div className="text-xs text-gray-600">• Email informatve</div>
          </div>
          
          <div className="border-l-4 border-blue-400 pl-2">
            <div className="text-xs font-medium">Touchpoint</div>
            <div className="text-xs text-gray-600 mt-1">• Form iscrizione</div>
            <div className="text-xs text-gray-600">• Call center</div>
            <div className="text-xs text-gray-600">• Email conferma</div>
            <div className="text-xs text-gray-600">• Pagamento online</div>
          </div>
          
          <div className="border-l-4 border-blue-300 pl-2">
            <div className="text-xs font-medium">Touchpoint</div>
            <div className="text-xs text-gray-600 mt-1">• Pre-partenza</div>
            <div className="text-xs text-gray-600">• Staff in loco</div>
            <div className="text-xs text-gray-600">• App mobile</div>
            <div className="text-xs text-gray-600">• Supporto 24/7</div>
          </div>
          
          <div className="border-l-4 border-blue-200 pl-2">
            <div className="text-xs font-medium">Touchpoint</div>
            <div className="text-xs text-gray-600 mt-1">• Survey post-viaggio</div>
            <div className="text-xs text-gray-600">• Programma referral</div>
            <div className="text-xs text-gray-600">• Newsletter</div>
            <div className="text-xs text-gray-600">• Community</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-gray-700 mb-3">Punti di Attrito vs Competitor</div>
          <div className="space-y-3">
            <div className="border rounded-lg p-3 border-red-100 bg-red-50">
              <div className="text-sm font-medium text-red-800">Scoperta: SEO gap</div>
              <div className="text-xs text-gray-600 mt-1">
                Bassa visibilità su keyword strategiche "vacanze studio ragazzi" (#6 vs #1 EF)
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs text-red-600">Impatto: <span className="font-medium">Alto</span></div>
                <div className="text-xs text-gray-500">Azione: Strategia SEO mirata</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3 border-red-100 bg-red-50">
              <div className="text-sm font-medium text-red-800">Considerazione: Testimonial gap</div>
              <div className="text-xs text-gray-600 mt-1">
                Minor numero di testimonianze video (6 vs 28 di EF) e recensioni verificate
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs text-red-600">Impatto: <span className="font-medium">Medio</span></div>
                <div className="text-xs text-gray-500">Azione: Campagna raccolta testimonianze</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3 border-red-100 bg-red-50">
              <div className="text-sm font-medium text-red-800">Post-Esperienza: Follow-up</div>
              <div className="text-xs text-gray-600 mt-1">
                Mancanza di programma strutturato post-esperienza vs community EF
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs text-red-600">Impatto: <span className="font-medium">Medio</span></div>
                <div className="text-xs text-gray-500">Azione: Programma fidelizzazione</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-gray-700 mb-3">Vantaggi Competitivi</div>
          <div className="space-y-3">
            <div className="border rounded-lg p-3 border-green-100 bg-green-50">
              <div className="text-sm font-medium text-green-800">Considerazione: Supporto psicopedagogico</div>
              <div className="text-xs text-gray-600 mt-1">
                Progetto "Partiamo dalla Mente" esclusivo con supporto pre-partenza vs servizi base di EF
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs text-green-600">Impatto: <span className="font-medium">Alto</span></div>
                <div className="text-xs text-gray-500">Azione: Potenziare comunicazione</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3 border-green-100 bg-green-50">
              <div className="text-sm font-medium text-green-800">Acquisto: Flessibilità pagamenti</div>
              <div className="text-xs text-gray-600 mt-1">
                Rateizzazione in 12 rate vs 6 rate di EF e programma INPS dedicato
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs text-green-600">Impatto: <span className="font-medium">Alto</span></div>
                <div className="text-xs text-gray-500">Azione: Evidenziare nei comparativi</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3 border-green-100 bg-green-50">
              <div className="text-sm font-medium text-green-800">Esperienza: Certificazioni</div>
              <div className="text-xs text-gray-600 mt-1">
                Doppia certificazione ISO 9001 e 14804 vs singola di concorrenti
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs text-green-600">Impatto: <span className="font-medium">Medio</span></div>
                <div className="text-xs text-gray-500">Azione: Badge sicurezza in homepage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="font-medium text-gray-700 mb-3">Action Planner</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-3 border-blue-100">
            <div className="flex items-center mb-2">
              <BarChart2 className="text-blue-600 mr-2" size={18} />
              <div className="font-medium text-sm">Breve Termine (1-3 mesi)</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <div className="text-xs">Ottimizzazione SEO per 5 keyword prioritarie (+30 backlink)</div>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <div className="text-xs">Campagna raccolta recensioni e attivazione Trustpilot</div>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <div className="text-xs">Implementazione A/B test form di conversione</div>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <div className="text-xs">Ottimizzazione mobile app (caricamento -40%)</div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-3 border-purple-100">
            <div className="flex items-center mb-2">
              <BarChart2 className="text-purple-600 mr-2" size={18} />
              <div className="font-medium text-sm">Medio Termine (3-6 mesi)</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <div className="text-xs">Lancio nuovo programma "STEM Explorer" in 3 destinazioni</div>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <div className="text-xs">Potenziamento supporto psicopedagogico con webinar pre-partenza</div>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <div className="text-xs">Implementazione chatbot assistenza in tempo reale</div>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <div className="text-xs">Restyling sito web con ottimizzazione UX/UI</div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-3 border-indigo-100">
            <div className="flex items-center mb-2">
              <BarChart2 className="text-indigo-600 mr-2" size={18} />
              <div className="font-medium text-sm">Lungo Termine (6-12 mesi)</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <div className="text-xs">Sviluppo 5 nuove destinazioni asiatiche (Singapore, Seoul)</div>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <div className="text-xs">Lancio programma fidelizzazione "Giocamondo Pass"</div>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <div className="text-xs">Implementazione certificazione Carbon Neutral su tutta l'offerta</div>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <div className="text-xs">Produzione docu-reality per storytelling esperienziale</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiocamondoDashboard;
