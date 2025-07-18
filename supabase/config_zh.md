# Supabase 配置文件中文说明文档

本文档详细说明了 `config.toml` 文件中各个配置字段的中文含义和用途。

## 基础配置

### project_id
- **说明**: 用于区分同一主机上不同 Supabase 项目的字符串
- **默认值**: 运行 `supabase init` 时的工作目录名称
- **示例**: `project_id = "with-supabase-app"`

## API 配置

### [api]
- **enabled**: 是否启用 API 服务
- **port**: API URL 使用的端口号（默认: 54321）
- **schemas**: 在 API 中暴露的数据库模式列表，默认为 `["public", "graphql_public"]`
- **extra_search_path**: 为每个请求添加到搜索路径的额外模式
- **max_rows**: 从视图、表或存储过程返回的最大行数，用于限制意外或恶意请求的负载大小

### [api.tls]
- **enabled**: 是否使用自签名证书在本地启用 HTTPS 端点

## 数据库配置

### [db]
- **port**: 本地数据库 URL 使用的端口号（默认: 54322）
- **shadow_port**: db diff 命令用于初始化影子数据库的端口（默认: 54320）
- **major_version**: 使用的数据库主版本号，必须与远程数据库相同

### [db.pooler]
- **enabled**: 是否启用连接池
- **port**: 本地连接池使用的端口号（默认: 54329）
- **pool_mode**: 指定服务器连接何时可以被其他客户端重用，支持 `transaction` 或 `session` 模式
- **default_pool_size**: 每个用户/数据库对允许的服务器连接数（默认: 20）
- **max_client_conn**: 允许的最大客户端连接数（默认: 100）

### [db.migrations]
- **enabled**: 如果禁用，在 db push 或 reset 期间将跳过迁移
- **schema_paths**: 描述数据库的有序模式文件列表，支持相对于 supabase 目录的 glob 模式

### [db.seed]
- **enabled**: 如果启用，在 db reset 期间迁移后为数据库播种
- **sql_paths**: 在 db reset 期间加载的种子文件有序列表

### [db.network_restrictions]
- **enabled**: 是否启用网络限制管理
- **allowed_cidrs**: 允许连接到数据库的 IPv4 CIDR 块列表
- **allowed_cidrs_v6**: 允许连接到数据库的 IPv6 CIDR 块列表

## Realtime 配置

### [realtime]
- **enabled**: 是否启用实时功能
- **ip_version**: 通过 IPv4 或 IPv6 绑定实时功能（默认: IPv4）
- **max_header_length**: HTTP 请求头的最大长度（字节）（默认: 4096）

## Studio 配置

### [studio]
- **enabled**: 是否启用 Supabase Studio
- **port**: Supabase Studio 使用的端口号（默认: 54323）
- **api_url**: 前端连接到的 API 服务器的外部 URL
- **openai_api_key**: 在 Supabase Studio 中用于 Supabase AI 的 OpenAI API 密钥

## 邮件测试服务器

### [inbucket]
- **enabled**: 是否启用邮件测试服务器
- **port**: 邮件测试服务器 Web 界面使用的端口号（默认: 54324）
- **smtp_port**: 用于测试发送邮件的用户应用程序的额外端口
- **pop3_port**: POP3 端口
- **admin_email**: 管理员邮箱
- **sender_name**: 发送者名称

## 存储配置

### [storage]
- **enabled**: 是否启用存储功能
- **file_size_limit**: 允许的最大文件大小（例如 "5MB", "500KB"）

### [storage.image_transformation]
- **enabled**: 是否启用图像转换 API（仅 Supabase Pro 计划可用）

### [storage.buckets]
- **public**: 存储桶是否公开
- **file_size_limit**: 文件大小限制
- **allowed_mime_types**: 允许的 MIME 类型列表
- **objects_path**: 对象存储路径

## 认证配置

### [auth]
- **enabled**: 是否启用认证功能
- **site_url**: 您的网站的基础 URL，用作重定向的白名单和构建邮件中使用的 URL
- **additional_redirect_urls**: 认证提供商在认证后允许重定向到的确切 URL 列表
- **jwt_expiry**: 令牌有效期（秒），默认 3600（1 小时），最大 604800（1 周）
- **enable_refresh_token_rotation**: 如果禁用，刷新令牌将永不过期
- **refresh_token_reuse_interval**: 允许刷新令牌在过期后重用的间隔（秒）
- **enable_signup**: 允许/禁止新用户注册
- **enable_anonymous_sign_ins**: 允许/禁止匿名登录
- **enable_manual_linking**: 允许/禁止测试手动链接账户
- **minimum_password_length**: 密码最小长度，推荐 8 或更多
- **password_requirements**: 密码要求，支持 `letters_digits`、`lower_upper_letters_digits`、`lower_upper_letters_digits_symbols`

### [auth.rate_limit]
- **email_sent**: 每小时可发送的邮件数量
- **sms_sent**: 每小时可发送的短信数量
- **anonymous_users**: 每小时每个 IP 地址可进行的匿名登录数量
- **token_refresh**: 5 分钟内每个 IP 地址可刷新的会话数量
- **sign_in_sign_ups**: 5 分钟内每个 IP 地址可进行的注册和登录请求数量
- **token_verifications**: 5 分钟内每个 IP 地址可进行的 OTP/魔法链接验证数量
- **web3**: 5 分钟内每个 IP 地址可进行的 Web3 登录数量

### [auth.captcha]
- **enabled**: 是否启用验证码
- **provider**: 支持的验证码提供商：`hcaptcha`、`turnstile`
- **secret**: 验证码密钥

### [auth.email]
- **enable_signup**: 允许/禁止通过邮件注册新用户
- **double_confirm_changes**: 如果启用，用户需要确认旧邮箱和新邮箱的邮件更改
- **enable_confirmations**: 如果启用，用户在登录前需要确认邮箱地址
- **secure_password_change**: 如果启用，用户需要重新认证或最近登录过才能更改密码
- **max_frequency**: 发送另一个注册确认或密码重置邮件前必须经过的最短时间
- **otp_length**: 邮件 OTP 中使用的字符数
- **otp_expiry**: 邮件 OTP 过期前的秒数（默认 1 小时）

### [auth.email.smtp]
- **enabled**: 是否启用 SMTP
- **host**: SMTP 服务器主机
- **port**: SMTP 端口
- **user**: SMTP 用户名
- **pass**: SMTP 密码
- **admin_email**: 管理员邮箱
- **sender_name**: 发送者名称

### [auth.sms]
- **enable_signup**: 允许/禁止通过短信注册新用户
- **enable_confirmations**: 如果启用，用户在登录前需要确认手机号
- **template**: 发送 OTP 给用户的模板
- **max_frequency**: 发送另一个短信 OTP 前必须经过的最短时间

### [auth.sessions]
- **timebox**: 在指定持续时间后强制登出
- **inactivity_timeout**: 如果用户不活跃时间超过指定持续时间则强制登出

### [auth.hook]
- **before_user_created**: 在新用户创建前运行的钩子
- **custom_access_token**: 在令牌发放前运行的钩子

### [auth.sms.twilio]
- **enabled**: 是否启用 Twilio
- **account_sid**: Twilio 账户 SID
- **message_service_sid**: Twilio 消息服务 SID
- **auth_token**: Twilio 认证令牌

### [auth.mfa]
- **max_enrolled_factors**: 每个用户一次可以注册的 MFA 因子数量

### [auth.mfa.totp]
- **enroll_enabled**: 是否启用 TOTP 注册
- **verify_enabled**: 是否启用 TOTP 验证

### [auth.mfa.phone]
- **enroll_enabled**: 是否启用手机 MFA 注册
- **verify_enabled**: 是否启用手机 MFA 验证
- **otp_length**: OTP 长度
- **template**: OTP 模板
- **max_frequency**: 最大频率

### [auth.external]
支持的外部 OAuth 提供商配置，包括：
- apple, azure, bitbucket, discord, facebook, github, gitlab, google, keycloak, linkedin_oidc, notion, twitch, twitter, slack, spotify, workos, zoom

每个提供商都支持以下配置：
- **enabled**: 是否启用
- **client_id**: 客户端 ID
- **secret**: 客户端密钥
- **redirect_uri**: 重定向 URI
- **url**: 提供商 URL
- **skip_nonce_check**: 是否跳过 nonce 检查

### [auth.web3.solana]
- **enabled**: 是否启用 Solana 钱包登录

### [auth.third_party]
支持第三方认证提供商：
- **firebase**: Firebase Auth
- **auth0**: Auth0
- **aws_cognito**: AWS Cognito
- **clerk**: Clerk

## Edge Runtime 配置

### [edge_runtime]
- **enabled**: 是否启用 Edge Runtime
- **policy**: 支持的请求策略：`oneshot`（热重载）或 `per_worker`（负载测试）
- **inspector_port**: 用于调试 Edge 函数的 Chrome 检查器端口
- **deno_version**: 使用的 Deno 主版本

## Analytics 配置

### [analytics]
- **enabled**: 是否启用分析功能
- **port**: 分析服务端口（默认: 54327）
- **backend**: 支持的后端：`postgres`、`bigquery`

## 实验性功能

### [experimental]
- **orioledb_version**: 配置 Postgres 存储引擎使用 OrioleDB (S3)
- **s3_host**: S3 存储桶 URL
- **s3_region**: S3 存储桶区域
- **s3_access_key**: S3 访问密钥 ID
- **s3_secret_key**: S3 秘密访问密钥

## 注意事项

1. **环境变量**: 敏感信息如密钥、令牌等应使用环境变量替代，格式为 `env(VARIABLE_NAME)`
2. **安全性**: 不要将敏感配置提交到版本控制系统
3. **端口冲突**: 确保配置的端口不与系统其他服务冲突
4. **版本兼容性**: 数据库版本必须与远程数据库保持一致
5. **网络限制**: 在生产环境中应适当配置网络限制以提高安全性 