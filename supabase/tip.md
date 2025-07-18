```bash
$ supabase start
Seeding globals from roles.sql...
WARN: no files matched pattern: supabase/seed.sql
WARNING: analytics requires mounting default docker socket: /var/run/docker.sock
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
   S3 Access Key: 625729a08b95bf1b7ff351a663f3a23c
   S3 Secret Key: 850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907
       S3 Region: local
```

Local data are backed up to docker volume. Use docker to show them: docker volume ls --filter label=com.supabase.cli.project=with-supabase-app

## Supabase 本地开发环境字段说明

### 🔗 服务端点 (Service Endpoints)

**API URL**: `http://127.0.0.1:54321`
- **作用**: Supabase REST API 的主要端点
- **用途**: 用于数据库 CRUD 操作、认证、实时订阅等
- **示例**: 前端应用通过此 URL 连接 Supabase 客户端

**GraphQL URL**: `http://127.0.0.1:54321/graphql/v1`
- **作用**: GraphQL API 端点
- **用途**: 支持 GraphQL 查询和变更操作
- **特点**: 提供更灵活的数据查询能力

**S3 Storage URL**: `http://127.0.0.1:54321/storage/v1/s3`
- **作用**: 文件存储服务端点
- **用途**: 上传、下载、管理文件（图片、文档等）
- **功能**: 支持公开和私有文件访问

### 🗄️ 数据库连接

**DB URL**: `postgresql://postgres:postgres@127.0.0.1:54322/postgres`
- **作用**: PostgreSQL 数据库连接字符串
- **格式**: `postgresql://用户名:密码@主机:端口/数据库名`
- **用途**: 直接连接数据库进行管理操作
- **注意**: 仅在本地开发环境使用，生产环境应使用环境变量

### 🛠️ 管理工具

**Studio URL**: `http://127.0.0.1:54323`
- **作用**: Supabase Studio 管理界面
- **功能**: 
  - 数据库表管理
  - SQL 编辑器
  - 认证用户管理
  - API 文档查看
  - 实时日志监控

**Inbucket URL**: `http://127.0.0.1:54324`
- **作用**: 本地邮件测试服务
- **用途**: 捕获和查看发送的邮件（如密码重置邮件）
- **特点**: 开发环境邮件不会真正发送，而是被此服务捕获

### 🔐 安全密钥

**JWT secret**: `super-secret-jwt-token-with-at-least-32-characters-long`
- **作用**: JWT 令牌签名密钥
- **用途**: 用于生成和验证用户认证令牌
- **安全**: 生产环境必须使用强密钥

**anon key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **作用**: 匿名用户 API 密钥
- **用途**: 前端应用用于公开数据访问
- **权限**: 受 Row Level Security (RLS) 策略限制

**service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **作用**: 服务角色 API 密钥
- **用途**: 后端服务用于绕过 RLS 策略
- **警告**: 仅在服务器端使用，永远不要暴露给前端

### 📁 存储配置

**S3 Access Key**: `625729a08b95bf1b7ff351a663f3a23c`
- **作用**: S3 兼容存储访问密钥
- **用途**: 文件上传/下载认证

**S3 Secret Key**: `850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907`
- **作用**: S3 兼容存储密钥
- **用途**: 文件操作签名验证

**S3 Region**: `local`
- **作用**: 存储服务区域标识
- **说明**: 本地开发环境固定为 "local"

### 💡 使用建议

1. **开发环境配置**: 将这些值配置到 `.env.local` 文件中
2. **安全注意**: 生产环境使用不同的密钥和 URL
3. **Studio 访问**: 通过 Studio URL 可以方便地管理数据库和查看 API 文档
4. **邮件测试**: 使用 Inbucket URL 测试邮件功能
5. **密钥管理**: anon key 用于前端，service_role key 仅用于后端


让我为您详细说明 Supabase 的收费情况。首先让我搜索一下最新的定价信息：


现在让我搜索更多关于免费层限制的信息：


基于我搜索到的 Supabase 官方定价信息，让我为您详细说明在 ECS 部署后 Supabase 的收费情况：

## 🆓 **免费层 (Free Plan)**

### 免费层限制：
- **项目数量**: 最多 2 个活跃项目
- **数据库存储**: 500 MB
- **文件存储**: 1 GB
- **月活跃用户**: 50,000 MAU
- **出站流量**: 5 GB
- **实时消息**: 200 万条
- **Edge Functions**: 50 万次调用

### 免费层特点：
- ✅ **完全免费**，无需信用卡
- ✅ 包含完整的 Supabase 功能
- ✅ 适合开发、测试和小型项目
- ⚠️ 超出限制会进入只读模式

## 💰 **付费层 (Pro Plan - $25/月)**

### Pro 层包含：
- **数据库存储**: 8 GB (可自动扩展)
- **文件存储**: 100 GB
- **月活跃用户**: 100,000 MAU
- **出站流量**: 250 GB
- **实时消息**: 500 万条
- **Edge Functions**: 200 万次调用

### 超出限制的额外费用：
- **数据库存储**: $0.125/GB/月
- **文件存储**: $0.021/GB/月
- **月活跃用户**: $0.00325/用户
- **出站流量**: $0.09/GB

## 🏢 **企业层 (Enterprise)**

- 自定义定价
- 无限存储和用户
- 专属支持
- 高级安全功能

## �� **具体收费场景分析**

### 场景 1: 小型应用 (免费层足够)
```
用户数: 1,000 MAU
数据库: 200 MB
文件存储: 500 MB
出站流量: 2 GB
费用: $0 (完全免费)
```

### 场景 2: 中型应用 (需要 Pro 层)
```
用户数: 50,000 MAU
数据库: 5 GB
文件存储: 50 GB
出站流量: 100 GB
费用: $25/月 (Pro 层基础费用)
```

### 场景 3: 大型应用 (超出 Pro 层限制)
```
用户数: 150,000 MAU (超出 50,000)
数据库: 20 GB (超出 12 GB)
文件存储: 200 GB (超出 100 GB)
出站流量: 500 GB (超出 250 GB)

额外费用计算:
- 用户: 50,000 × $0.00325 = $162.50
- 数据库: 12 GB × $0.125 = $1.50
- 文件存储: 100 GB × $0.021 = $2.10
- 出站流量: 250 GB × $0.09 = $22.50

总费用: $25 + $162.50 + $1.50 + $2.10 + $22.50 = $213.60/月
```

## 💡 **成本优化建议**

1. **合理使用免费层**：
   - 开发阶段使用免费层
   - 生产环境再升级到付费层

2. **监控使用量**：
   - 定期检查 Dashboard 中的使用情况
   - 设置使用量告警

3. **优化存储**：
   - 定期清理无用数据
   - 压缩图片和文件
   - 使用 CDN 减少出站流量

4. **用户管理**：
   - 实现用户会话管理
   - 清理不活跃用户

## �� **与 ECS 的关系**

当您将项目部署到 ECS 时：
- **Supabase 费用**: 独立于 ECS 费用
- **ECS 费用**: 需要单独支付 AWS ECS 费用
- **网络费用**: ECS 到 Supabase 的网络流量计入出站流量

**总结**: Supabase 提供慷慨的免费层，对于大多数中小型应用来说完全够用。只有在用户量很大或存储需求很高时才需要考虑付费升级。

```plaintext
用户数: 1,000 MAU
数据库: 200 MB
文件存储: 500 MB
出站流量: 2 GB
费用: $0 (完全免费)
```

```plaintext
用户数: 50,000 MAU
数据库: 5 GB
文件存储: 50 GB
出站流量: 100 GB
费用: $25/月 (Pro 层基础费用)
```

```plaintext
用户数: 150,000 MAU (超出 50,000)
数据库: 20 GB (超出 12 GB)
文件存储: 200 GB (超出 100 GB)
出站流量: 500 GB (超出 250 GB)

额外费用计算:
- 用户: 50,000 × $0.00325 = $162.50
- 数据库: 12 GB × $0.125 = $1.50
- 文件存储: 100 GB × $0.021 = $2.10
- 出站流量: 250 GB × $0.09 = $22.50

总费用: $25 + $162.50 + $1.50 + $2.10 + $22.50 = $213.60/月
```