import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom Vite plugin to handle local data saving during dev mode
function localDataApiPlugin() {
  return {
    name: 'local-data-api',
    configureServer(server) {
      server.middlewares.use('/api/save-data', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const { type, data } = JSON.parse(body)

              if (type === 'pages') {
                // Save the entire pagesData object
                const filePath = path.resolve(__dirname, 'src/data/pagesData.js')

                // Read the existing file to preserve helper functions
                const existingContent = fs.readFileSync(filePath, 'utf-8')
                const helperStart = existingContent.indexOf('/**\n * Helper: Extract flat profile')

                const helperCode = helperStart !== -1
                  ? existingContent.substring(helperStart)
                  : ''

                const content = `/**\n * pagesData.js — Single Source of Truth\n * \n * All content is structured as a block tree per "page" (home, projects).\n * Both Viewer Mode and Editor Mode render from this same data.\n * The editor modifies blocks in-place, then persists back here via the dev API.\n */\n\nexport const pagesData = ${JSON.stringify(data, null, 2)};\n\n${helperCode}`
                fs.writeFileSync(filePath, content, 'utf-8')

              } else if (type === 'profile') {
                const filePath = path.resolve(__dirname, 'src/data/profileData.js')
                const content = `export const profileData = ${JSON.stringify(data, null, 2)};\n`
                fs.writeFileSync(filePath, content, 'utf-8')

              } else if (type === 'projects') {
                const filePath = path.resolve(__dirname, 'src/data/projectsData.js')
                const { categories, tags, projects } = data
                const content = `export const projectCategories = ${JSON.stringify(categories, null, 2)};\n\nexport const allTags = ${JSON.stringify(tags, null, 2)};\n\nexport const projectsData = ${JSON.stringify(projects, null, 2)};\n`
                fs.writeFileSync(filePath, content, 'utf-8')
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: `${type} data saved successfully!` }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
        } else {
          res.statusCode = 405
          res.end('Method Not Allowed')
        }
      })

      // PDF Upload Middleware
      server.middlewares.use('/api/upload-pdf', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const { filename, base64 } = JSON.parse(body)
              if (!filename || !base64) throw new Error('Missing filename or base64 data')

              // Remove the data URL prefix (e.g., data:application/pdf;base64,)
              const base64Data = base64.replace(/^data:application\/pdf;base64,/, "")
              
              const pdfDir = path.resolve(__dirname, 'public/pdfs')
              if (!fs.existsSync(pdfDir)) {
                fs.mkdirSync(pdfDir, { recursive: true })
              }

              // Save the file
              const filePath = path.join(pdfDir, filename)
              fs.writeFileSync(filePath, base64Data, 'base64')

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                success: true, 
                message: 'PDF uploaded successfully',
                pdfUrl: `/homepage/pdfs/${filename}`
              }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
        } else {
          res.statusCode = 405
          res.end('Method Not Allowed')
        }
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localDataApiPlugin()],
  base: '/homepage/',
})
