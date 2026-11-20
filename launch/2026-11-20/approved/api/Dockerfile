FROM us-east1-docker.pkg.dev/think-tank-solutions-ai/cloud-run-source-deploy/think-tank-hub@sha256:5d165c560b32911e0e268636394687a200493ef74e19b5e9d6372d9418711bad
USER root
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
WORKDIR /app
COPY --chown=node:node package.json server.mjs lead-validation.mjs tts-inquiry-policy.mjs ./
COPY --chown=node:node public ./public
USER node
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node","server.mjs"]
