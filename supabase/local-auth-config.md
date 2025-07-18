# 本地 Supabase 认证配置

## 需要在 Supabase Studio 中配置的重定向 URL

访问 `http://127.0.0.1:54323` 进入本地 Supabase Studio，然后在以下位置配置：

### 1. 认证设置 (Authentication > URL Configuration)

添加以下重定向 URL：
```
http://localhost:3000/auth/confirm
http://localhost:3000/auth/update-password
http://localhost:3000/
```

### 2. 邮件模板设置 (Authentication > Email Templates)

可以自定义邮件模板，但本地开发时邮件会被 Inbucket 捕获：
- 访问 `http://127.0.0.1:54324` 查看捕获的邮件

### 3. 站点 URL 设置

设置站点 URL 为：
```
http://localhost:3000
```

## 本地开发注意事项

1. **邮件测试**：所有邮件都会发送到 Inbucket (`http://127.0.0.1:54324`)
2. **数据库管理**：通过 Studio (`http://127.0.0.1:54323`) 管理
3. **API 文档**：在 Studio 中可以查看完整的 API 文档
4. **实时日志**：在 Studio 中可以查看实时请求日志 