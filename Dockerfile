# FROM node:18-alpine AS base

# FROM base AS deps

# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /app


# # Install dependencies based on the preferred package manager
# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
#   else echo "Lockfile not found." && exit 1; \
#   fi



# ใช้ Node.js base image แบบเบา
FROM node:18-alpine

# ตั้ง working directory
WORKDIR /app

# คัดลอกเฉพาะไฟล์ package เพื่อ install dependencies ก่อน (เพื่อใช้ cache ได้ดี)
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมด (ทีหลัง เพื่อให้ขั้นตอนก่อนหน้านี้ cache ได้ถ้าไม่มีการเปลี่ยนโค้ด)
COPY . .

# เปิดพอร์ตที่แอปใช้งาน
EXPOSE 3000

# รันคำสั่งเมื่อ container start
CMD ["npm", "run", "dev"]