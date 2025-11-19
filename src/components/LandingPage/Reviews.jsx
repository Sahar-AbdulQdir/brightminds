import React from "react";

const reviews = [
  {
    name: "FF1",
    text: "Honestly guys, coming from a year 11 student, I use this all the time. Recommend it to all my friends, it's so amazing!",
    likes: 993,
  },
  {
    name: "Cheese",
    text: "GIZMO IS THE BEST! Get it if you need straight A’s. OMG I LOVE YOU GIZMO 😭💛💫",
    likes: 828,
  },
  {
    name: "Alexander",
    text: "I’m annoyed I didn’t discover this sooner... Used it for my AP Bio exam and it made studying so easy!",
    likes: 554,
  },
  {
    name: "Sabrina524",
    text: "This app got me an A+ in microbiology! 💗✨",
    likes: 144,
  },
  {
    name: "Norachai",
    text: "Gizmo is the life force behind my grades!",
    likes: 312,
  },
  {
    name: "Penny",
    text: "This app honestly saved my life during finals 😭📚",
    likes: 402,
  },
  {
    name: "ASF :O",
    text: "I have a history app and it made me so much more prepared!",
    likes: 95,
  },
  {
    name: "Luna",
    text: "The only study app I actually enjoy using. Highly recommend ⭐",
    likes: 221,
  },
  {
    name: "Nova",
    text: "Such a well-designed app! It keeps me consistent and motivated every day 💪📖",
    likes: 507,
  },
];

const ReviewsSection = () => {
  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
          What Our Users Say
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`bg-gray-50 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition duration-300 text-left p-5 w-full sm:w-[45%] lg:w-[30%]
              ${
                // add offset to every second row
                Math.floor(index / 3) % 2 === 1 ? "lg:translate-x-12" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">
                  {review.name}
                </h3>
                <div className="flex items-center text-pink-600 font-semibold text-sm">
                  ❤️ <span className="ml-1">{review.likes}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
