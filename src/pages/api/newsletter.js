// pages/api/newsletter.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ success: false, error: 'Email requis.' });
      }
  
      const API_KEY = process.env.KLAVIYO_API_KEY;
      const LIST_ID = process.env.KLAVIYO_LIST_ID;
  
      try {
        // Vérifier si l'email existe déjà
        const response = await fetch(
          `https://a.klaviyo.com/api/lists/${LIST_ID}/profiles/?fields[profile]=email&filter=equals(email,%22${email}%22)`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "revision": '2024-07-15',
              'Authorization': `Klaviyo-API-Key ${API_KEY}`,
            },
          }
        );
        const list = await response.json();
        
        if (list?.data?.length > 0) {
          return res.status(400).json({ success: false, error: 'Email déjà abonné.' });
        }
  
        // Ajouter l'email à la liste
        const response2 = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "revision": '2024-07-15',
            'Authorization': `Klaviyo-API-Key ${API_KEY}`,
          },
          body: JSON.stringify({
            data: {
              type: 'profile-subscription-bulk-create-job',
              attributes: {
                profiles: {
                  data: [
                    {
                      type: 'profile',
                      attributes: {
                        email: email
                      }
                    }
                  ]
                },
                historical_import: false
              },
              relationships: { list: { data: { type: 'list', id: LIST_ID } } }
            }
          })
        });
  
        if (response2.status === 202) {
          return res.status(200).json({ success: true });
        } else {
          const data = await response2.json();
          return res.status(400).json({ success: false, error: data.errors ? data.errors[0].detail : 'Une erreur est survenue.' });
        }
      } catch (e) {
        return res.status(500).json({ message: 'Une erreur est survenue', error: e.message });
      }
    } else {
      res.status(405).json({ success: false, error: 'Méthode non autorisée' });
    }
  }
  