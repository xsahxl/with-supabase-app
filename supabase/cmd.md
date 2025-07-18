# Supabase CLI 命令参考

## 项目初始化和管理

### `supabase init`
**用途**: 初始化一个新的 Supabase 项目
**说明**: 在当前目录创建 `supabase/` 文件夹和配置文件
```bash
supabase init
```

### `supabase start`
**用途**: 启动本地 Supabase 开发环境
**说明**: 启动本地数据库、API、Auth、Storage 等服务
```bash
supabase start
```

### `supabase stop`
**用途**: 停止本地 Supabase 开发环境
**说明**: 停止所有本地服务
```bash
supabase stop
```

### `supabase status`
**用途**: 检查本地 Supabase 服务状态
**说明**: 显示哪些服务正在运行
```bash
supabase status
```

## 数据库管理

### `supabase db push`
**用途**: 将本地迁移推送到远程数据库
**说明**: 
- 将 `supabase/migrations/` 目录中的所有迁移文件应用到远程数据库
- 这是部署数据库架构变更的主要命令
- 会按时间戳顺序执行所有迁移
```bash
supabase db push
```

### `supabase db reset`
**用途**: 重置本地数据库
**说明**: 
- 删除本地数据库并重新创建
- 重新运行所有迁移文件
- 重新插入种子数据（如果配置了）
```bash
supabase db reset
```

### `supabase db diff`
**用途**: 生成数据库架构差异
**说明**: 
- 比较本地和远程数据库的架构差异
- 生成新的迁移文件
- 用于检测架构变更
```bash
supabase db diff --schema public
```

### `supabase db pull`
**用途**: 从远程数据库拉取架构
**说明**: 
- 将远程数据库的架构拉取到本地
- 生成新的迁移文件
- 用于同步远程变更
```bash
supabase db pull
```

### `supabase migration new`
**用途**: 创建新的迁移文件
**说明**: 
- 在 `supabase/migrations/` 目录创建新的迁移文件
- 文件名格式：`YYYYMMDDHHMMSS_description.sql`
```bash
supabase migration new create_users_table
```

## 函数管理

### `supabase functions new`
**用途**: 创建新的 Edge Function
**说明**: 
- 在 `supabase/functions/` 目录创建新的函数
- 生成基本的函数模板
```bash
supabase functions new my-function
```

### `supabase functions serve`
**用途**: 本地运行 Edge Functions
**说明**: 
- 在本地启动函数服务器进行测试
- 默认端口 54321
```bash
supabase functions serve
```

### `supabase functions deploy`
**用途**: 部署 Edge Functions 到远程
**说明**: 
- 将本地函数部署到 Supabase 项目
- 需要先链接项目
```bash
supabase functions deploy my-function
```

## 项目链接

### `supabase link`
**用途**: 链接本地项目到远程 Supabase 项目
**说明**: 
- 将本地开发环境连接到远程项目
- 需要项目引用 ID 和访问令牌
```bash
supabase link --project-ref your-project-ref
```

### `supabase unlink`
**用途**: 取消链接本地项目
**说明**: 
- 断开与远程项目的连接
```bash
supabase unlink
```

## 数据管理

### `supabase db seed`
**用途**: 运行种子数据
**说明**: 
- 执行 `supabase/seed.sql` 文件
- 用于插入初始数据
```bash
supabase db seed
```

### `supabase db dump`
**用途**: 导出数据库数据
**说明**: 
- 导出数据库架构和数据
- 生成 SQL 文件
```bash
supabase db dump --data-only
```

## 配置管理

### `supabase config`
**用途**: 查看和修改配置
**说明**: 
- 显示当前配置
- 可以修改各种设置
```bash
supabase config show
```

## 常用工作流程

### 开发新功能的工作流程：
1. **启动本地环境**:
   ```bash
   supabase start
   ```

2. **创建迁移文件**:
   ```bash
   supabase migration new add_new_table
   ```

3. **编辑迁移文件** (在 `supabase/migrations/` 目录)

4. **应用迁移到本地**:
   ```bash
   supabase db reset
   ```

5. **测试功能**

6. **推送到远程**:
   ```bash
   supabase db push
   ```

### 从远程同步变更：
1. **拉取远程架构**:
   ```bash
   supabase db pull
   ```

2. **重置本地数据库**:
   ```bash
   supabase db reset
   ```

## 重要提示

- **迁移文件**: 迁移文件一旦推送到远程就不能修改，只能创建新的迁移
- **本地开发**: 使用 `supabase start` 启动本地环境进行开发
- **生产部署**: 使用 `supabase db push` 将变更推送到生产环境
- **备份**: 定期使用 `supabase db dump` 备份数据
- **配置**: 修改 `supabase/config.toml` 来自定义本地开发环境

## 故障排除

### 常见问题：
1. **端口冲突**: 检查 `config.toml` 中的端口设置
2. **迁移失败**: 确保迁移文件语法正确，没有依赖问题
3. **链接失败**: 检查项目引用 ID 和访问令牌是否正确

### 重置环境：
```bash
supabase stop
supabase start
supabase db reset
```