# syntax=docker/dockerfile:1
FROM nikolaik/python-nodejs:python3.10-nodejs16

ARG CLIENT_FOLDER='/app/client/build'
ARG NOTE_URL=https://piano.playbook.dzlab.net/note
ARG PORT=5000
ARG PUBLIC_URL=https://piano.playbook.dzlab.net

ENV CLIENT_FOLDER=$CLIENT_FOLDER
ENV REACT_APP_NOTE_URL=$NOTE_URL
ENV PORT=$PORT
ENV PUBLIC_URL=$PUBLIC_URL

WORKDIR /app
COPY . .

# Install Flask 
RUN pip install -r server/requirements.txt

# Install node dependencies
RUN cd client && rm -rf build && yarn install --frozen-lockfile && yarn build 

EXPOSE 5000

# Run Server
CMD [ "python", "server/run_server.py" ]
