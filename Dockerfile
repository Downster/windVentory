FROM node:12 AS build-stage
ARG NPM_TOKEN  
WORKDIR /frontend
COPY frontend/. .

ENV REACT_APP_BASE_URL=https://windventory.herokuapp.com/

# Build our React App
COPY .npmrc .npmrc  
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > /app/.npmrc && \
    npm install && \
    rm -f /app/.npmrc
RUN npm run build

FROM python:3.9

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True


EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /frontend/build/* app/static/

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run flask environment
CMD gunicorn --worker-class eventlet -w 1 app:app