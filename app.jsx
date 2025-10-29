import React, { useState } from "react";
export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (newItem.trim() === "") return;
    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = newItem;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }
    setNewItem("");
  };
  const handleEdit = (index) => {
    setNewItem(items[index]);
    setEditIndex(index);
  };
  const handleDelete = (index) => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
  };
  return (
    <div className="app-container">
      <h1>ONLINE BOOK</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter item name"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAdd}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">
            <span>{item}</span>
            <div className="btn-group">
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

cd hos
call npm ci || call npm install
call npm run build 
mkdir "C:\ProgramData\Jenkins\.Jenkins\userContent\react-app"
xcopy /E /I /Y "dist\*" "C:\ProgramData\Jenkins\.Jenkins\userContent\react-app\"
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/akash012345678/MovieTicketBookingSystem.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('movie-ticket-booking') {
                    bat '"C:\\Program Files\\nodejs\\npm.cmd" install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('movie-ticket-booking') {
                    bat '"C:\\Program Files\\nodejs\\npm.cmd" run build'
                }
            }
        }
    }

    post {
        success {
            echo "React project built successfully!"
        }
        failure {
            echo "Build failed!"
        }
    }
}
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
