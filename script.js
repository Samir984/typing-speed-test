"use strict";
//random paragaph

const paragraph = [
  "In the bustling streets of a vibrant city, where skyscrapers reached towards the heavens, a young artist named Maya found solace in the strokes of her paintbrush. With a heart full of passion and a mind teeming with imagination, she transformed blank canvases into vivid works of art that breathed life into the mundane. Colors danced across the surfaces, capturing emotions and telling stories that transcended language.",
  "Maya's art became a bridge between worlds, a kaleidoscope of perspectives that invited viewers to step into her world and explore the depths of their own souls. Each stroke held a piece of her essence, a glimpse into the dreams and aspirations that fueled her creativity. Her studio, a sanctuary of endless possibilities, overflowed with sketches, paintings, and sculptures, each a testament to her boundless imagination.",
  "Through her art, Maya discovered the power of connection. Strangers would gaze upon her creations, their eyes lighting up with recognition and understanding. She realized that her art had the ability to touch hearts, to spark conversations, and to ignite change. It became a silent language that spoke to the depths of human experience, transcending barriers of culture, age, and background.",
  "As Maya's reputation grew, so did her responsibility. She became a voice for the voiceless, using her art to raise awareness about social injustices and environmental issues. Her paintings depicted the beauty of diversity and the urgency of protecting our planet, inspiring others to take action and create a better world.",
  "When it comes to maintaining a reader's attention, a good rule of thumb might be to avoid writing more than five or six sentences in a paragraph before finding a logical place to break. That said, remember that the idea behind a paragraph might be short and sweet, or it might merit deeper explanation.",
  "In the heart of a bustling metropolis, where the city lights illuminated the night sky, a young entrepreneur named Alex embarked on a journey to build their own business empire. Armed with a visionary mind and an unwavering determination, Alex forged ahead, navigating the ever-shifting landscape of innovation and competition.",
  "From the humble beginnings of a small startup, Alex's business grew like a wildfire, fueled by a relentless pursuit of excellence and a keen understanding of market dynamics. They assembled a team of brilliant minds, each contributing their unique talents and expertise to propel the company forward. Together, they crafted innovative solutions that disrupted traditional industries and set new benchmarks for success.",
  "Alex's leadership style was marked by compassion and inclusivity. They fostered a culture of collaboration and encouraged employees to think outside the box, empowering them to take risks and unleash their full potential. The company became a hub of creativity and innovation, attracting top talent from around the world who were drawn to Alex's vision and the opportunity to make a meaningful impact.",
  "On a windswept beach, where the crashing waves met the golden sands, a solitary figure named Lily stood in awe of the vast ocean stretching out before her. With a heart filled with wanderlust and a spirit hungry for adventure, she embarked on a solo journey around the world.",
  "With each new destination, Lily discovered the beauty of human connection. She encountered kind strangers who became lifelong friends, shared stories with locals who opened their hearts and homes, and found inspiration in the shared experiences of fellow travelers. The world became her classroom, and every encounter was a lesson in empathy, understanding, and the universal language of kindness.",
  "As her journey drew to a close, Lily returned to the windswept beach where it all began. But she was no longer the same person who had set foot on the sand months ago. She had been transformed by the experiences, the people, and the places she had encountered along the way. With a heart full of gratitude and a newfound sense of purpose, she carried the world within her, forever changed by the beauty she had witnessed and the connections she had made.",
  "And as the waves continued to crash upon the shore, Lily stood there, knowing that her journey was just the beginning. She was filled with a renewed sense of curiosity and an insatiable hunger to explore more, to continue chasing the enchantment that lay beyond the horizon. For her, the world would forever be an open invitation to embrace the unknown, to live boldly, and to weave her own extraordinary story.",
];

//dom element
//user-setting dom
const selectTimer = document.querySelector(".set-timmer");
const timmer = document.querySelector(".timmer");
const resetBtn = document.querySelector(".reset");
//user-progress dom
const charCounter = document.querySelector(".char-count");
const accuracyMeasure = document.querySelector(".accuracy");

//content dom
let typingText = document.querySelector(".typing-text");
const input = document.querySelector("#input");
let cursor;
let eachChar = null;

// ------------------------------------

//function
const generateRandomPragraph = function () {
  const randomParagraph = Math.ceil(Math.random() * paragraph.length);
  return randomParagraph;
};

const getParagphInfo = function (index) {
  const words = paragraph[index].split(" ");
  const wordCount = words.length;
  const character = paragraph[index].split("").length;
  return [wordCount, character];
};

const renderPragraph = function (index) {
  const cursorHtml = '<div style="display: inline-block" class="cursor"></div>';

  paragraph[index].split("").map((value) => {
    const html = `<span>${value}</span>`;
    typingText.insertAdjacentHTML("beforeend", html);
  });
  eachChar = document.querySelectorAll(".typing-text span");
  eachChar[0].insertAdjacentHTML("afterbegin", cursorHtml);
  cursor = document.querySelector(".cursor");
};

//class app
class App {
  totalWord;
  totalCharacter;
  previousCorrectChar;
  previousInCorrectChar;
  accuracy;
  runningtimmer;
  count;
  start;
  end;

  constructor() {
    this.count = 0;
    this.start = false;

    this.intialCondition();
    selectTimer.addEventListener("change", this.handelSelectChange.bind(this));
    resetBtn.addEventListener("click", this.intialCondition.bind(this));
    input.addEventListener("input", this.startTyping.bind(this));
  }

  intialCondition() {
    //fetch new paragraph
    this.fetchparagraph();

    //stop running timmer
    this.stopTimmer();

    //set timmer to default select
    this.handelSelectChange();

    //setting all to
    [
      this.previousCorrectChar,
      this.previousCorrectWord,
      this.previousInCorrectChar,
    ] = [0, 0, 0];

    charCounter.textContent = "0";
    accuracyMeasure.textContent = "0%";

    //input focus
    input.focus();
  }

  fetchparagraph() {
    //select random paragraph
    let paragraphIndex = generateRandomPragraph();

    //getting total word and charactor from selected pragraph
    [this.totalWord, this.totalCharacter] = getParagphInfo(paragraphIndex - 1);

    //clear previous Paragraph
    typingText.innerHTML = "";

    //generate paragraph
    renderPragraph(paragraphIndex - 1);

    this.count = 0;

    input.value = "";
  }

  handelSelectChange() {
    input.focus();
    timmer.textContent = selectTimer.value * 60;
  }

  startTyping(e) {
    //start Timmer
    if (!this.start) {
      this.startTimmer();
    }

    this.cheackEach(e);
  }
  //this will be call in each input
  cheackEach(e) {
    if (e.data === null && this.count !== 0) {
      eachChar[this.count - 1].classList.remove("incorrect");
      eachChar[this.count - 1].classList.remove("correct");

      this.count--;
      eachChar[this.count - 1]?.insertAdjacentElement("afterend", cursor) ??
        eachChar[0].insertAdjacentElement("afterbegin", cursor);

      //
    } else if (input.value[this.count] === eachChar[this.count++].textContent) {
      eachChar[this.count - 1].classList.add("correct");
      eachChar[this.count - 1].insertAdjacentElement("afterend", cursor);
    } else {
      // console.log("incorrect");
      //

      eachChar[this.count - 1].classList.add("incorrect");
      eachChar[this.count - 1].insertAdjacentElement("afterend", cursor);
    }
    // console.log(this.count, this.totalCharacter);

    if (this.totalCharacter === this.count) {
      this.userProcress("new");
      this.fetchNew();
    } else {
      this.userProcress("_");
    }
  }

  userProcress(value) {
    //preserve old value when new content arrived
    if (value === "new") {
      //preserving previous data
      this.previousCorrectChar +=
        typingText.querySelectorAll(".correct").length;
      charCounter.textContent = this.previousCorrectChar;
      this.previousInCorrectChar +=
        typingText.querySelectorAll(".incorrect").length;
      charCounter.textContent = this.previousCorrectChar;
      return;
    }

    //for character count
    let tempCorrectCount = typingText.querySelectorAll(".correct").length;
    charCounter.textContent = this.previousCorrectChar + tempCorrectCount;
    let tempInCorrectCount = typingText.querySelectorAll(".incorrect").length;
    let totalIncorrectChar = this.previousInCorrectChar + tempInCorrectCount;

    //for accuracy measure
    accuracyMeasure.textContent = `${Math.ceil(
      (Number(charCounter.textContent) /
        (totalIncorrectChar + 0.01 + Number(charCounter.textContent))) *
        100
    ).toFixed(2)}%`;
  }

  fetchNew() {
    this.fetchparagraph();
  }

  startTimmer() {
    this.start = true;

    this.runningtimmer = setInterval(function () {
      timmer.textContent -= 1;

      console.log(timmer.textContent);
      if (timmer.textContent == 0) {
        app.stopTimmer();
        input.removeEventListener("input", app.startTyping.bind(app));
        input.disabled = true;
      }
    }, 1000);
    // disable timmerselect
    selectTimer.style.opacity = "0.5";
    selectTimer.style.pointerEvents = "none";
  }

  stopTimmer() {
    this.start = false;
    clearInterval(this.runningtimmer);
    //enabel input
    input.disabled = false;

    //enable timmerselect
    selectTimer.style.opacity = "1";
    selectTimer.style.pointerEvents = "auto";
  }
}

const app = new App();

//On click anywhere foucs input
document.addEventListener("click", function (e) {
  if (e.target === selectTimer) return;
  input.focus();
});
