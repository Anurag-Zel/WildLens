# WildLens 🐾

> **Note:** The CNN model exposed via FastAPI on Render.com may take some time to wake up if it's idle.  
> If the model is down, please visit [FAST-API Model](https://animal-image-classifier-7212.onrender.com) and wait 2-3 minutes for it to be ready.
> [Ready: Preview](./Preview.png)

WildLens is a web application that identifies animals in images and provides interesting facts about them using a combination of a **CNN-based image classifier** and **Google Gemini AI**.  

Users can paste an animal image URL, get the predicted animal name, and optionally fetch **3 interesting facts** about that animal.

---

## Live Demo

- **Backend:** [https://wild-lens-eight.vercel.app/api](https://wild-lens-eight.vercel.app/api)
  - `/classify.js` - Fetch results from CNN model  
  - `/gemini.js` - Fetch 3 facts about the animal  
  - `/index.js` - Test route (Homepage)  

- **Frontend:** [https://wild-lens-frontend.vercel.app/](https://wild-lens-frontend.vercel.app/)

---

## Features

- Upload or paste an image URL of an animal.
- Predicts the animal using a **CNN model** (85% accuracy).
- Displays a **preview of the image** before classification.
- Provides a **formatted list of 3 interesting facts** about the identified animal using **Google Gemini AI**.
- Simple and responsive UI with a visually appealing design.

---

## Testing Image Links

You can test the app using the following image URLs:

- **Dolphin:** 
```bash
https://media.istockphoto.com/id/94323862/photo/dolphin-jump-out-of-the-water-in-sea.jpg?s=612x612&w=0&k=20&c=BONzkIngL_B-xZDc7DdLJI-CcYdED0IT5FzRQpoldlg=
```
- **Dog:** 
```bash
https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*
```
- **Tiger:**
```bash
https://media.istockphoto.com/id/1420676204/photo/portrait-of-a-royal-bengal-tiger-alert-and-staring-at-the-camera-national-animal-of-bangladesh.jpg?s=612x612&w=0&k=20&c=0OCYv99Ktv3fJ-YYlg7SetHBJj3pIk58WY7GDy5VCtI=
```
- **Elephant:**
```bash
https://media.istockphoto.com/id/1452952557/photo/big-tusker-craig-in-amboseli-kenya-with-a-clouded-sky-in-the-background.jpg?s=612x612&w=0&k=20&c=Hs2YQUox5mIG0NJlyhqNjRklTGvkVmk_UfHs18lYg6E=
```

---

## Technology Stack

**Backend:**

- Node.js + Express.js
- Vercel Serverless Functions (`classify.js`, `gemini.js`)
- CNN Model served via FastAPI ([Source](https://github.com/Anurag-Zel/Animal-Image-Classifier.git))
- Google Gemini AI for generating facts
- CORS enabled for frontend communication

**Frontend:**

- React.js (SPA)
- Functional components with Hooks (`useState`)
- Responsive design with inline CSS styling

**Model:**

- Custom CNN model with **85% accuracy**
- Classifies 90+ animal species
- Hosted on Render.com: [https://animal-image-classifier-7212.onrender.com](https://animal-image-classifier-7212.onrender.com)

---

## API Routes

### Backend (`/api`)

- **POST `/classify.js`**  
  Accepts `{ img_url }` and returns:
  ```json
  {
    "label": "tiger",
    "index": 82
  }
- **POST `/gemini.js`**  
  Accepts `{ animal_name }` and returns a string of 3 formatted facts

---

## Install Dependencies
- **Clone the repository:**
```bash
    git clone https://github.com/Anurag-Zel/WildLens.git
    cd WildLens
```
- **Install Dependancies:**
  - *Backend:*
  ```bash
      cd backend
      npm install
  ```
  - *Frontend:*
  ```bash
      cd frontend
      npm install
  ```
- **Create *.env* file in backend folder with :**
```bash
    SERVER_PORT=4000
    GEMINI_API_KEY=YOUR_GOOGLE_GENAI_API_KEY
```
- **Start Development Servers:**
```bash
    # Backend
    cd backend
    npm run dev

    # Frontend
    cd frontend
    npm start
```
---

## Supported Animals

The model can classify animals into 90 classes: ([see full list here](./classname_of_the_animals.txt))

---

## Testing & Usage

- Open the frontend in your browser: http://localhost:3000
- Paste any image URL of an animal (try the testing images above).
- Click Identify Animal.
- Once the prediction appears, click Do you want to know 3 facts about [Animal]? to fetch facts.
- Facts will be displayed in bolded headings with descriptions.

---

## References

- CNN Model Repository: https://github.com/Anurag-Zel/Animal-Image-Classifier.git
- Google Gemini AI: https://developers.google.com/
- Vercel Deployment: https://vercel.com/
- React Documentation: https://reactjs.org/

## License

MIT License © Anurag Zel