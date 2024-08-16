# Sử dụng Node.js image từ Docker Hub
FROM node:14

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json
COPY . .

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn ứng dụng
COPY . .

# Expose port
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["node", "app.js"]
