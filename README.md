# Install Docker

Steps from: [Docker Documentation](https://docs.docker.com/engine/install/ubuntu/)

### Set up Docker's apt repository

1. Update and clean the package lists:

   ```sh
   sudo apt update -y && sudo apt full-upgrade -y && sudo apt autoremove -y && sudo apt clean -y && sudo apt autoclean -y
   ```

2. Install required packages:

   ```sh
   sudo apt-get install ca-certificates curl
   ```

3. Add Docker's official GPG key:

   ```sh
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc
   ```

4. Add the repository to Apt sources:

   ```sh
   echo \
   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
   $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt-get update
   ```

### Install the Docker packages

```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

# FastAPI in Containers - Docker

Steps from: [FastAPI Documentation](https://fastapi.tiangolo.com/deployment/docker/)

### Build and Run FastAPI with Docker

1. Build docker image, pull postgres, create network and run docker into the same network:

   ```sh
   sudo docker build -t fastapi .
   sudo docker pull postgres
   sudo docker network create fastapi
   sudo docker run -d --name postgres --network fastapi -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -p 5432:5432 postgres
   sudo docker run -d --name fastapi --network fastapi -p 80:80 fastapi
   ```

2. Go to: [http://localhost/docs](http://localhost/docs)

# Troubleshooting

- Check running docker containers:

  ```sh
  sudo docker ps
  ```

- Check all docker containers (running and stopped):

  ```sh
  sudo docker ps -a
  ```

- Stop docker containers:

  ```sh
  sudo docker stop <container_name>
  ```

- Run docker containers:

  ```sh
  sudo docker start <container_name>
  ```

- Remove docker containers:

  ```sh
  sudo docker rm <container_id>
  ```

- Remove docker images:

  ```sh
  sudo docker rmi <image_id>
  ```
