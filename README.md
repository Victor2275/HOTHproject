Link: https://taskable-bice.vercel.app/
Password for teacher: teacher

Here is a draft for your README.md file, incorporating the features and tech stack of TaskAble.

Markdown
# TaskAble

TaskAble is a web-based educational platform designed to help autistic students manage daily classroom activities. By providing a structured environment with clear instructions and positive reinforcement, TaskAble aims to create a calmer, more engaging, and supportive classroom experience for both students and educators.

## Features

TaskAble is built with two distinct, real-time synchronized interfaces:

### Teacher Dashboard
* **Task Management:** Create, assign, and remove tasks for the class.
* **Session Control:** Start and pause active classroom sessions.
* **Roster Management:** Manage the student roster and view individual progress.
* **Monitoring:** Track student task completion, logged emotions, and earned rewards in real-time.

### Student View
* **Distraction-Free Interface:** A view-only screen displaying active tasks to keep students focused.
* **AI-Powered Steps:** Complex tasks are automatically broken down into actionable, kid-friendly steps using the Gemini API.
* **Reward System:** Students earn stars for completing tasks, which can be spent to plant trees in their persistent virtual "Reward Forest."
* **Emotional Logging:** Students can log their current emotions, providing valuable feedback to the teacher.

## Tech Stack

* **Frontend:** React
* **Backend & Database:** Firebase Firestore
* **AI Integration:** Gemini API (Task breakdown and simplification)

* ## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites (if you dont use the link and would like your own build)

* Node.js and npm installed on your machine.
* A Firebase account and project set up.
* A Gemini API key.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/TaskAble.git](https://github.com/yourusername/TaskAble.git)
   cd TaskAble
Install dependencies:

Bash
npm install
Environment Setup:
Create a .env file in the root directory and add your API keys:

Code snippet
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
Start the development server:

Bash
npm start
The application should now be running on http://localhost:3000.

🗺️ Roadmap
Deep Analytics: Generate trend reports for teachers correlating student emotions with specific tasks or times of day.

Expanded Reward Ecosystem: Develop the "Reward Forest" into a more interactive and gamified environment.

Multimodal Feedback: Integrate audio-visual cues to further assist neurodivergent students.

🤝 Contributing
Contributions, issues, and feature requests are welcome!

This project is licensed under the MIT License.
