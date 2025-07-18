-- 创建企业表
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    description TEXT,
    details TEXT,
    address TEXT,
    website VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_companies_name ON public.companies(name);
CREATE INDEX IF NOT EXISTS idx_companies_created_at ON public.companies(created_at);

-- 启用 RLS (Row Level Security)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有用户查看企业信息
CREATE POLICY "允许所有用户查看企业信息" ON public.companies
    FOR SELECT USING (true);

-- 创建策略：只允许认证用户创建企业
CREATE POLICY "允许认证用户创建企业" ON public.companies
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 创建策略：只允许认证用户更新企业信息
CREATE POLICY "允许认证用户更新企业信息" ON public.companies
    FOR UPDATE USING (auth.role() = 'authenticated');

-- 创建策略：只允许认证用户删除企业
CREATE POLICY "允许认证用户删除企业" ON public.companies
    FOR DELETE USING (auth.role() = 'authenticated');

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 