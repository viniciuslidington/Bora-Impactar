docker compose up --build -d   

cd bi-back

docker build --platform linux/amd64 -t hubdoacoes-backend:0.9 .  

cd ../bi-front

docker build --platform linux/amd64 -t hubdoacoes-frontend:0.9 .  
