export const projectCategories = [
  "All Projects",
  "Finance & Quant",
  "Marketing Analytics",
  "Bioinformatics",
  "Data Warehouse & ETL",
  "Dashboards & Viz"
];

export const allTags = [
  "Python",
  "R",
  "SQL",
  "dbt",
  "Snowflake",
  "BigQuery",
  "QuantLib",
  "XGBoost",
  "Streamlit",
  "Bioinformatics",
  "Tableau",
  "React.js",
  "Airflow",
  "DuckDB"
];

export const projectsData = [
  {
    id: "project-1",
    title: "Quant Risk & Portfolio Optimization Engine",
    subtitle: "Automated Portfolio Optimization & Value-at-Risk (VaR) Analytics Engine",
    category: "Finance & Quant",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    description: "Sistem analitik finansial berbasis Python untuk menghitung Efficient Frontier, Sharpe Ratio, Monte Carlo VaR simulation, dan backtesting strategi alokasi aset secara real-time.",
    tags: [
      { name: "Python", color: "blue" },
      { name: "QuantLib", color: "purple" },
      { name: "Streamlit", color: "red" },
      { name: "Financial Modeling", color: "orange" }
    ],
    githubUrl: "https://github.com/iqdamshidqi/portfolio-quant-engine",
    demoUrl: "https://portfolio-quant-engine.streamlit.app",
    featured: true,
    date: "2024"
  },
  {
    id: "project-2",
    title: "Customer Lifetime Value & Churn Prediction",
    subtitle: "Predictive Marketing Analytics & RFM Customer Segmentation",
    category: "Marketing Analytics",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description: "Model Machine Learning (XGBoost & Survival Analysis) untuk memprediksi probabilitas churn pelanggan e-commerce dan estimasi Customer Lifetime Value (CLV) 12 bulan ke depan.",
    tags: [
      { name: "Python", color: "blue" },
      { name: "XGBoost", color: "green" },
      { name: "RFM Segmentation", color: "yellow" },
      { name: "A/B Testing", color: "pink" }
    ],
    githubUrl: "https://github.com/iqdamshidqi/clv-churn-prediction",
    demoUrl: "https://clv-churn-dashboard.example.com",
    featured: true,
    date: "2024"
  },
  {
    id: "project-3",
    title: "Genomic Variant Effect Predictor (VEP) Pipeline",
    subtitle: "Computational Bioinformatics & Variant Pathogenicity Annotation",
    category: "Bioinformatics",
    coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    description: "Pipeline bioinformatika terintegrasi dengan Ensembl & ClinVar API untuk menganalisis efek varian genetik non-coding pada ekspresi gen (RNA-seq) dan struktur protein 3D.",
    tags: [
      { name: "Bioinformatics", color: "purple" },
      { name: "Python", color: "blue" },
      { name: "R", color: "brown" },
      { name: "Ensembl API", color: "green" }
    ],
    githubUrl: "https://github.com/iqdamshidqi/genomic-vep-pipeline",
    demoUrl: "https://genomic-vep-analyzer.example.com",
    featured: true,
    date: "2024"
  },
  {
    id: "project-4",
    title: "Modern Enterprise Data Warehouse Architecture",
    subtitle: "End-to-End dbt + Snowflake Dimensional Data Modeling",
    category: "Data Warehouse & ETL",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Arsitektur Data Warehouse berbasis Star-Schema dengan dbt (data build tool), Snowflake, dan Apache Airflow. Mengolah 50M+ raw data log menjadi mart data siap analitik.",
    tags: [
      { name: "SQL", color: "blue" },
      { name: "dbt", color: "orange" },
      { name: "Snowflake", color: "blue" },
      { name: "Airflow", color: "green" }
    ],
    githubUrl: "https://github.com/iqdamshidqi/dbt-snowflake-datawarehouse",
    demoUrl: null,
    featured: true,
    date: "2023"
  },
  {
    id: "project-5",
    title: "Multi-Touch Marketing Attribution Model",
    subtitle: "Data-Driven Marketing Budget Allocation using Markov Chains",
    category: "Marketing Analytics",
    coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    description: "Algoritma Markov Chain dan Shapley Value untuk mengukur efektivitas setiap channel pemasaran digital (Google Ads, Social, Email) dalam konversi penjualan.",
    tags: [
      { name: "Python", color: "blue" },
      { name: "Marketing Analytics", color: "yellow" },
      { name: "BigQuery", color: "blue" }
    ],
    githubUrl: "https://github.com/iqdamshidqi/marketing-attribution-model",
    demoUrl: "https://attribution-model.example.com",
    featured: false,
    date: "2023"
  },
  {
    id: "project-6",
    title: "Executive Financial & Sales Intelligence Dashboard",
    subtitle: "Interactive Real-time Data Visualization in Tableau & Streamlit",
    category: "Dashboards & Viz",
    coverImage: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80",
    description: "Dashboard interaktif eksekutif untuk memantau KPI keuangan bulanan, arus kas (Cash Flow), analisis varians anggaran, dan tren penjualan agregat.",
    tags: [
      { name: "Tableau", color: "yellow" },
      { name: "SQL", color: "blue" },
      { name: "DuckDB", color: "purple" }
    ],
    githubUrl: "https://github.com/iqdamshidqi/finance-exec-dashboard",
    demoUrl: "https://public.tableau.com",
    featured: false,
    date: "2023"
  }
];
