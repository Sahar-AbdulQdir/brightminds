// import sbd from "sbd";
// import { simplify } from "simplify-text";
// import nlp from "compromise";

// export const simplifyText = (req, res) => {
//   const { text } = req.body;

//   if (!text) {
//     return res.status(400).json({ message: "No text provided" });
//   }

//   // 1. Split into sentences
//   const sentences = sbd.sentences(text);

//   // 2. Simplify vocabulary
//   const simplifiedSentences = sentences.map(sentence => {
//     let simple = simplify(sentence);

//     // 3. NLP cleanup
//     simple = nlp(simple)
//       .sentences()
//       .toPresentTense()
//       .out("text");

//     return simple;
//   });

//   // 4. Rejoin
//   const simplifiedText = simplifiedSentences.join(" ");

//   res.json({ simplifiedText });
// };
