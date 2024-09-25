const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./src/config.js/db')
const authRoute = require('./src/routes/authRoutes')//login etc
const campaignRoute = require('./src/routes/campaignRoutes')//login etc
const targetRoute = require('./src/routes/targetRoutes')//login etc
const cron = require('node-cron')
const updateCampaignStatus = require('./src/controllers/deadlineController')
const { checkCampaignNotifications } = require('./src/controllers/notificationController')

dotenv.config()

const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const corsOption = {
    origin: 'http://localhost:3000',
    // origin: 'https://full-stack-web2-campaign-project.vercel.app' || 'http://localhost:3000',
    credentials: true,
    optionSucessStatus: 200
}
app.use(cors(corsOption))

// app.get("/", async (req, res) => {
//     console.log("home works well")
// })

app.use('/api/auth', authRoute);
app.use('/api/campaign', campaignRoute);
app.use('/api/target', targetRoute);

cron.schedule('*/1 * * * *', () => {
    updateCampaignStatus()//also deadline
   // checkCampaignNotifications()//check and send mail(finding out our to pass user email to it)
    console.log("Running every 1 to 5 minutes")
})



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Listening on port ", PORT)

})