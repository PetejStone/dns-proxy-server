const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Use CORS middleware
app.use(cors());

app.use(express.json());

app.get('/proxy', async (req, res) => {
    const { query, apiKey } = req.query;

    if (!query || !apiKey) {
        return res.status(400).json({ error: 'Missing query or apiKey parameter' });
    }

    try {
        const response = await axios.get(`https://api.securitytrails.com/v1/domain/${query}/subdomains?children_only=true`, {
            params: { query },
            headers: { 'APIKEY': apiKey }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
