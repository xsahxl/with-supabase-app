-- 为公司表添加状态字段
ALTER TABLE public.companies 
ADD COLUMN status VARCHAR(20) DEFAULT 'draft' NOT NULL;

-- 添加状态约束
ALTER TABLE public.companies 
ADD CONSTRAINT check_status 
CHECK (status IN ('draft', 'pending', 'approved', 'rejected', 'archived'));

-- 创建状态索引
CREATE INDEX IF NOT EXISTS idx_companies_status ON public.companies(status);

-- 更新现有记录的状态为已审核通过
UPDATE public.companies SET status = 'approved' WHERE status = 'draft';

-- 添加状态变更时间字段
ALTER TABLE public.companies 
ADD COLUMN status_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 创建状态更新时间触发器
CREATE OR REPLACE FUNCTION update_status_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        NEW.status_updated_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_companies_status_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW
    EXECUTE FUNCTION update_status_updated_at_column(); 