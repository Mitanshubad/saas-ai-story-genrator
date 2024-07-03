// import React, { useState } from 'react';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { jsPDF } from 'jspdf';

// const StoryGeneration = () => {
//   // State to manage input fields, generated story, and loading status
//   const [title, setTitle] = useState('');
//   const [characterDescription, setCharacterDescription] = useState('');
//   const [message, setMessage] = useState('');
//   const [wordCount, setWordCount] = useState(100); // Default to 100 words
//   const [story, setStory] = useState('');
//   const [loading, setLoading] = useState(false);

//   const apiKey = "AIzaSyDznSrpkIafXf7-czR6UlQKyID4_M9n0Qw";
//   const genAI = new GoogleGenerativeAI(apiKey);

//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });

//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };

//   // Function to handle story generation
//   const generateStory = async () => {
//     setLoading(true);
//     setStory('');
//     try {
//       const chatSession = model.startChat({
//         generationConfig,
//         history: [
//           {
//             role: "user",
//             parts: [
//               { text: "hi\n" },
//             ],
//           },
//           {
//             role: "model",
//             parts: [
//               { text: "Hi there! What can I do for you today?\n" },
//             ],
//           },
//         ],
//       });

//       // Constructing the prompt with input values
//       const userPrompt = `Generate a story with the title "${title}". The main character is described as: ${characterDescription}. Additionally, ${message}. The story should be ${wordCount} words long in simple vocabulary.`;

//       const result = await chatSession.sendMessage(userPrompt);
//       setStory(result.response.text());
//     } catch (error) {
//       console.error('Error generating story:', error);
//       setStory('An error occurred while generating the story. Please try again.');
//     }
//     setLoading(false);
//   };

//   const downloadPDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.text(title, 20, 30); // Title in bold

//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     doc.text(story, 20, 50, { maxWidth: 170 }); // Story in normal text

//     doc.save(`${title}.pdf`);
//   };

//   //image 

//   const [prompt, setPrompt] = useState('');

//   const [imageSrc, setImageSrc] = useState(null);
//   const [error, setError] = useState('');

//   const fetchImage = async (prompt) => {
//     setLoading(true);
//     setImageSrc(null);
//     setError('');

//     const prompt = `Generate a image of "${title}". The main character is described as: ${characterDescription}. Additionally, ${message}.`;

//     try {
//       const response = await fetch(
//         "https://api-inference.huggingface.co/models/mann-e/Mann-E_Dreams",
//         {
//           headers: {
//             Authorization: "Bearer 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", 
//             "Content-Type": "application/json",
//           },
//           method: "POST",
//           body: JSON.stringify({ inputs: prompt }),
//         }
//       );

//       if (!response.ok) {
//         const errorDetail = await response.json();
//         console.error('Error detail:', errorDetail);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const blob = await response.blob();
//       const imageUrl = URL.createObjectURL(blob);
//       setImageSrc(imageUrl);
//     } catch (error) {
//       console.error('Error generating image:', error);
//       setError('An error occurred while generating the image. Please try again.');
//     }
//     setLoading(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (prompt) {
//       fetchImage(prompt);
//     }
//   };
// //image
//   return (
//     <div className="p-4">
     
//       <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl  text-gray-900 k">
//       Describe your imagination to get converted into a real story
//       </h1>

//       {/* Input fields for story generation */}
//       <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Story Title :</label>
//       <input
//         type="text"
//         id="title"
//         className="block mb-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         placeholder="Enter the title of the story..."
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <label htmlFor="characterDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Character Description :</label>
//       <input
//         type="text"
//         id="characterDescription"
//         className="block mb-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         placeholder="Describe the main character..."
//         value={characterDescription}
//         onChange={(e) => setCharacterDescription(e.target.value)}
//       />

//       <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Additional Details :</label>
//       <textarea
//         id="message"
//         rows="4"
//         className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         placeholder="Provide additional details or plot points..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       ></textarea>

//       <label htmlFor="wordCount" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Number of Words :</label>
//       <input
//         type="number"
//         id="wordCount"
//         className="block mb-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         value={wordCount}
//         onChange={(e) => setWordCount(e.target.value)}
//         min="50" // Setting a minimum word count for practical purposes
//         max="1000" // Setting a maximum word count
//       />

//       <button
//         className="mt-4 px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         onClick={generateStory}
//         disabled={!title || !characterDescription || !message || loading} // Disable if inputs are empty or loading
//       >
//         Generate Story
//       </button>

//       {/* Loading Indicator */}
//       {loading && (
//         <div className="mt-4 max-w-sm animate-pulse">
//           <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
//           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
//           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
//           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
//           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
//           <span className="sr-only">Loading...</span>
//         </div>
//       )}

//       {/* Display the generated story */}
//       {story && (
//         <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-600">
//           <h4 className="text-lg font-bold mb-2">{title}</h4>
//           <p className="text-gray-900 dark:text-white">{story}</p>
//         </div>
//       )}

//       <button onClick={downloadPDF} className='bg-red-500 text-white rounded m-2 p-2'>download PDF</button>



    










//  <form onSubmit={handleSubmit}>
       
//           <input
//             type="text"
//             id="prompt"
//             className="block w-full p-2.5 mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="e.g., Astronaut riding a horse"
//             value={prompt}
//             onChange={(e) => setPrompt(prompt)}
//             required
//           />
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg"
//             disabled={loading}
//           >
//             {loading ? 'Generating...' : 'Generate Image'}
//           </button>
//         </form>


//         {error && <p className="mt-4 text-red-500">{error}</p>}
  
//   {imageSrc && (
//     <div className="mt-4">
//       <h2 className="text-xl font-bold mb-2">Generated Image:</h2>
//       <img src={imageSrc} alt="Generated" className="w-full rounded-lg border" />
//     </div>
//   )}

//     </div>
//   );
// }

// export default StoryGeneration;


import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { jsPDF } from 'jspdf';

const StoryGeneration = () => {
  // State to manage input fields, generated story, and loading status
  const [title, setTitle] = useState('');
  const [characterDescription, setCharacterDescription] = useState('');
  const [message, setMessage] = useState('');
  const [wordCount, setWordCount] = useState(100); // Default to 100 words
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState('');

  const apiKey = "AIzaSyDznSrpkIafXf7-czR6UlQKyID4_M9n0Qw"; // Replace with your actual Google API key
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  // Function to handle story generation
  const generateStory = async () => {
    setLoading(true);
    setStory('');
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              { text: "hi\n" },
            ],
          },
          {
            role: "model",
            parts: [
              { text: "Hi there! What can I do for you today?\n" },
            ],
          },
        ],
      });

      // Constructing the prompt with input values
      const userPrompt = `Generate a story with the title "${title}". The main character is described as: ${characterDescription}. Additionally, ${message}. The story should be ${wordCount} words long in simple vocabulary.`;

      const result = await chatSession.sendMessage(userPrompt);
      setStory(result.response.text());
    } catch (error) {
      console.error('Error generating story:', error);
      setStory('An error occurred while generating the story. Please try again.');
    }
    setLoading(false);
  };

  // Function to fetch and display image based on prompt
  const fetchImage = async () => {
    setLoading(true);
    setImageSrc(null);
    setError('');

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mann-e/Mann-E_Dreams",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: story }), // Use generated story as prompt
        }
      );

      if (!response.ok) {
        const errorDetail = await response.json();
        console.error('Error detail:', errorDetail);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('An error occurred while generating the image. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (story) {
      fetchImage();
    }
  }, [story]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, 30); // Title in bold

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(story, 20, 50, { maxWidth: 170 }); // Story in normal text

    doc.save(`${title}.pdf`);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl">
        Describe your imagination to get converted into a real story
      </h1>

      {/* Input fields for story generation */}
      {/* You can remove these input fields if you don't want them */}
      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Story Title:</label>
      <input
        type="text"
        id="title"
        className="block mb-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter the title of the story..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="characterDescription" className="block mb-2 text-sm font-medium text-gray-900">Character Description:</label>
      <input
        type="text"
        id="characterDescription"
        className="block mb-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Describe the main character..."
        value={characterDescription}
        onChange={(e) => setCharacterDescription(e.target.value)}
      />

      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Additional Details:</label>
      <textarea
        id="message"
        rows="4"
        className="block mb-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Provide additional details or plot points..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <label htmlFor="wordCount" className="block mb-2 text-sm font-medium text-gray-900">Number of Words:</label>
      <input
        type="number"
        id="wordCount"
        className="block mb-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        value={wordCount}
        onChange={(e) => setWordCount(e.target.value)}
        min="50"
        max="1000"
      />

      <button
        className="mt-4 px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg"
        onClick={generateStory}
        disabled={!title || !characterDescription || !message || loading}
      >
        Generate Story
      </button>

      {/* Loading Indicator */}
      {loading && (
        <div className="mt-4 max-w-sm animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {/* Display the generated story */}
      {story && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
          <h4 className="text-lg font-bold mb-2">{title}</h4>
          <p className="text-gray-900">{story}</p>
        </div>
      )}

      <button onClick={downloadPDF} className='bg-red-500 text-white rounded m-2 p-2'>Download PDF</button>
      <h6 className='text-gray-400'>The image may take some time to load</h6>

      {/* Display the generated image */}
      {imageSrc && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Generated Image:</h2>
          <img src={imageSrc} alt="Generated" className="w-full rounded-lg border" />
        </div>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}

    </div>
  );
}

export default StoryGeneration;
