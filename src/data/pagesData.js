/**
 * pagesData.js — Single Source of Truth
 * 
 * All content is structured as a block tree per "page" (home, projects).
 * Both Viewer Mode and Editor Mode render from this same data.
 * The editor modifies blocks in-place, then persists back here via the dev API.
 */

export const pagesData = {
  "home": {
    "title": "Iqdam Shidqi",
    "subtitle": "Data Scientist & Analytics Engineer",
    "emoji": "👨‍💻",
    "coverImage": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    "workspaceName": "Iqdam's Workspace",
    "status": "🟢 Available for Data Science & Engineering projects",
    "socials": [
      {
        "platform": "GitHub",
        "url": "https://github.com/iqdamshidqi",
        "icon": "Github"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/iqdam-shidqi-817535282/",
        "icon": "Linkedin"
      },
      {
        "platform": "Email",
        "url": "mailto:iqdamshidqiali@gmail.com",
        "icon": "Mail"
      },
      {
        "platform": "Kaggle",
        "url": "https://www.kaggle.com/iqdamshidqiali",
        "icon": "Award"
      },
      {
        "platform": "Threads",
        "url": "https://threads.net/@iqdamshidqi",
        "icon": "AtSign"
      }
    ],
    "blocks": [
      {
        "id": "home-1",
        "type": "callout",
        "content": {
          "emoji": "💡",
          "title": "Welcome to my Digital Workspace!",
          "description": "I specialize in end-to-end Data Science & Engineering solutions across Quantitative Finance, Marketing Analytics, Computational Genomics (Bioinformatics), and Cloud Data Warehousing."
        }
      },
      {
        "id": "home-2",
        "type": "heading2",
        "content": {
          "text": "About Me",
          "icon": "FileText"
        }
      },
      {
        "id": "home-3",
        "type": "paragraph",
        "content": {
          "text": "Halo! Saya Iqdam Shidqi, seorang Data Scientist dan Analytics Engineer yang berpengalaman merancang pipelines data end-to-end, pemodelan prediktif, serta visualisasi data interaktif."
        }
      },
      {
        "id": "home-4",
        "type": "paragraph",
        "content": {
          "text": "Fokus keahlian saya mencakup analisis data finansial, pemodelan atribusi & retensi marketing, pemrosesan data genomik (bioinformatika), serta arsitektur modern data warehouse (dbt, Snowflake, BigQuery)."
        }
      },
      {
        "id": "home-5",
        "type": "paragraph",
        "content": {
          "text": "Saya percaya bahwa insight data yang terbaik lahir dari kombinasi statistik yang kokoh, domain knowledge yang mendalam, dan penyampaian visual yang bersih dan elegan."
        }
      },
      {
        "id": "home-6",
        "type": "divider",
        "content": {}
      },
      {
        "id": "home-7",
        "type": "heading2",
        "content": {
          "text": "Focus Domains & Expertise",
          "icon": "Target"
        }
      },
      {
        "id": "home-8",
        "type": "specializationGrid",
        "content": {
          "cards": [
            {
              "title": "Finance & Quantitative Risk",
              "emoji": "📈",
              "description": "Portofolio optimization, Algorithmic Trading strategies, Credit Risk scoring, dan Time-Series Financial Forecasting."
            },
            {
              "title": "Marketing & Growth Analytics",
              "emoji": "🎯",
              "description": "Customer Lifetime Value (CLV) modeling, Churn prediction, Multi-Touch Attribution, dan RFM Customer Segmentation."
            },
            {
              "title": "Bioinformatics & Genomic Data",
              "emoji": "🧬",
              "description": "Variant Effect Prediction (VEP), RNA-seq differential expression analysis, dan visualisasi interaktif biomolekuler."
            },
            {
              "title": "Data Warehouse & Analytics Engineering",
              "emoji": "🏗️",
              "description": "Star-schema dimensional modeling, dbt transformation pipelines, BigQuery/Snowflake optimization, dan automated ETL."
            }
          ]
        }
      },
      {
        "id": "home-9",
        "type": "divider",
        "content": {}
      },
      {
        "id": "home-10",
        "type": "heading2",
        "content": {
          "text": "Core Tech Stack & Tools",
          "icon": "Wrench"
        }
      },
      {
        "id": "home-11",
        "type": "skillGroup",
        "content": {
          "skillData": {
            "groupTitle": "Finance & Quant",
            "skills": [
              {
                "name": "Python (Pandas, NumPy)",
                "color": "blue"
              },
              {
                "name": "QuantLib & PyPortfolioOpt",
                "color": "purple"
              },
              {
                "name": "Time Series (ARIMA, Prophet)",
                "color": "green"
              },
              {
                "name": "Monte Carlo Simulation",
                "color": "orange"
              }
            ]
          }
        }
      },
      {
        "id": "home-12",
        "type": "skillGroup",
        "content": {
          "skillData": {
            "groupTitle": "Marketing Analytics",
            "skills": [
              {
                "name": "RFM Segmentation",
                "color": "yellow"
              },
              {
                "name": "CLV & Churn Modeling",
                "color": "red"
              },
              {
                "name": "A/B Testing & Causal Inference",
                "color": "pink"
              },
              {
                "name": "Mixpanel / GA4 Analytics",
                "color": "blue"
              }
            ]
          }
        }
      },
      {
        "id": "home-13",
        "type": "skillGroup",
        "content": {
          "skillData": {
            "groupTitle": "Bioinformatics",
            "skills": [
              {
                "name": "Bioconductor & R",
                "color": "purple"
              },
              {
                "name": "Variant Calling & VEP",
                "color": "green"
              },
              {
                "name": "RNA-Seq Pipelines",
                "color": "blue"
              },
              {
                "name": "NCBI & Ensembl APIs",
                "color": "brown"
              }
            ]
          }
        }
      },
      {
        "id": "home-14",
        "type": "skillGroup",
        "content": {
          "skillData": {
            "groupTitle": "Data Warehouse & ETL",
            "skills": [
              {
                "name": "SQL (Advanced)",
                "color": "blue"
              },
              {
                "name": "dbt (data build tool)",
                "color": "orange"
              },
              {
                "name": "Google BigQuery & Snowflake",
                "color": "blue"
              },
              {
                "name": "Apache Airflow & Prefect",
                "color": "green"
              },
              {
                "name": "PostgreSQL & DuckDB",
                "color": "purple"
              }
            ]
          }
        }
      },
      {
        "id": "home-15",
        "type": "skillGroup",
        "content": {
          "skillData": {
            "groupTitle": "Visualization & Web",
            "skills": [
              {
                "name": "Streamlit & Dash",
                "color": "red"
              },
              {
                "name": "Tableau & Looker Studio",
                "color": "yellow"
              },
              {
                "name": "React.js & Tailwind CSS",
                "color": "blue"
              },
              {
                "name": "Plotly & D3.js",
                "color": "green"
              }
            ]
          }
        }
      },
      {
        "id": "home-16",
        "type": "divider",
        "content": {}
      },
      {
        "id": "home-17",
        "type": "socialLinks",
        "content": {
          "title": "Explore Portfolio Projects",
          "description": "Lihat proyek-proyek analitik kuantitatif, machine learning, bioinformatika, dan data warehouse.",
          "ctaLabel": "Lihat Semua Projects"
        }
      }
    ]
  },
  "projects": {
    "title": "Data Science Projects",
    "subtitle": "Portofolio & Eksperimen Data Science",
    "emoji": "📊",
    "coverImage": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    "categories": [
      "All Projects",
      "Finance & Quant",
      "Marketing Analytics",
      "Bioinformatics",
      "Data Warehouse & ETL",
      "Dashboards & Viz"
    ],
    "allTags": [
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
    ],
    "blocks": [
      {
        "id": "proj-1",
        "type": "projectCard",
        "content": {
          "projectData": {
            "id": "project-1",
            "title": "Quant Risk & Portfolio Optimization Engine",
            "subtitle": "Automated Portfolio Optimization & VaR Engine",
            "category": "Finance & Quant",
            "coverImage": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
            "description": "ini terkait kcaobcwqbsknoxanssaxb\n\n**project overview**\n\n|iqdam|shidqi|\n|-----|------|\n|iqdam|shidqi|\n|303010|dnqonxin|\n\n$$Iqdam$$",
            "tags": [
              {
                "name": "Python",
                "color": "blue"
              },
              {
                "name": "QuantLib",
                "color": "purple"
              },
              {
                "name": "Streamlit",
                "color": "red"
              },
              {
                "name": "iqdam",
                "color": "brown"
              }
            ],
            "githubUrl": "https://github.com/iqdamshidqi/portfolio-quant-engine",
            "demoUrl": "https://portfolio-quant-engine.streamlit.app",
            "date": "2024",
            "pdfUrl": "/homepage/pdfs/1786198551291-notasi-contoh.pdf",
            "_blockId": "proj-1"
          }
        }
      },
      {
        "id": "proj-2",
        "type": "projectCard",
        "content": {
          "projectData": {
            "id": "project-2",
            "title": "Customer Lifetime Value & Churn Prediction",
            "subtitle": "Predictive Marketing Analytics & RFM Segmentation",
            "category": "Marketing Analytics",
            "coverImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            "description": "Model Machine Learning (XGBoost & Survival Analysis) untuk memprediksi probabilitas churn pelanggan e-commerce dan estimasi Customer Lifetime Value 12 bulan.",
            "tags": [
              {
                "name": "Python",
                "color": "blue"
              },
              {
                "name": "XGBoost",
                "color": "green"
              },
              {
                "name": "RFM Segmentation",
                "color": "yellow"
              }
            ],
            "githubUrl": "https://github.com/iqdamshidqi/clv-churn-prediction",
            "demoUrl": "https://clv-churn-dashboard.example.com",
            "date": "2024"
          }
        }
      },
      {
        "id": "proj-3",
        "type": "projectCard",
        "content": {
          "projectData": {
            "id": "project-3",
            "title": "Genomic Variant Effect Predictor (VEP) Pipeline",
            "subtitle": "Computational Bioinformatics & Variant Pathogenicity",
            "category": "Bioinformatics",
            "coverImage": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
            "description": "Pipeline bioinformatika terintegrasi dengan Ensembl & ClinVar API untuk menganalisis efek varian genetik non-coding pada ekspresi gen (RNA-seq) dan struktur protein 3D.",
            "tags": [
              {
                "name": "Bioinformatics",
                "color": "purple"
              },
              {
                "name": "Python",
                "color": "blue"
              },
              {
                "name": "Ensembl API",
                "color": "green"
              }
            ],
            "githubUrl": "https://github.com/iqdamshidqi/genomic-vep-pipeline",
            "demoUrl": null,
            "date": "2024"
          }
        }
      },
      {
        "id": "block-1786197584198",
        "type": "projectCard",
        "content": {
          "projectData": {
            "id": "project-3",
            "title": "Genomic Variant Effect Predictor (VEP) Pipeline",
            "subtitle": "Computational Bioinformatics & Variant Pathogenicity",
            "category": "Bioinformatics",
            "coverImage": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
            "description": "Pipeline bioinformatika terintegrasi dengan Ensembl & ClinVar API untuk menganalisis efek varian genetik non-coding pada ekspresi gen (RNA-seq) dan struktur protein 3D.",
            "tags": [
              {
                "name": "Bioinformatics",
                "color": "purple"
              },
              {
                "name": "Python",
                "color": "blue"
              },
              {
                "name": "Ensembl API",
                "color": "green"
              }
            ],
            "githubUrl": "https://github.com/iqdamshidqi/genomic-vep-pipeline",
            "demoUrl": null,
            "date": "2024"
          }
        }
      }
    ]
  }
};

/**
 * Helper: Extract flat profile object for backward compatibility
 */
export function getProfileFromPages(pages) {
  const home = pages.home;
  const skillsGrouped = {};

  // Extract skills from skillGroup blocks
  home.blocks
    .filter(b => b.type === 'skillGroup')
    .forEach(b => {
      const sd = b.content.skillData;
      skillsGrouped[sd.groupTitle] = sd.skills;
    });

  // Extract specializations from specializationGrid blocks
  const specBlock = home.blocks.find(b => b.type === 'specializationGrid');
  const specializations = specBlock ? specBlock.content.cards : [];

  // Extract bio paragraphs
  const aboutBio = home.blocks
    .filter(b => b.type === 'paragraph')
    .map(b => b.content.text);

  // Extract welcome callout
  const calloutBlock = home.blocks.find(b => b.type === 'callout');
  const welcomeCallout = calloutBlock
    ? { emoji: calloutBlock.content.emoji, title: calloutBlock.content.title, description: calloutBlock.content.description }
    : { emoji: "💡", title: "", description: "" };

  return {
    name: home.title,
    role: home.subtitle,
    workspaceName: home.workspaceName,
    avatarEmoji: home.emoji,
    coverImage: home.coverImage,
    location: "Indonesia",
    status: home.status,
    welcomeCallout,
    aboutBio,
    specializations,
    skillsGrouped,
    socials: home.socials
  };
}

/**
 * Helper: Extract flat projects list for backward compatibility
 */
export function getProjectsFromPages(pages) {
  return pages.projects.blocks
    .filter(b => b.type === 'projectCard')
    .map(b => b.content.projectData);
}
