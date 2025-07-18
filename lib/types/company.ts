// 企业类型定义
export interface Company {
  id: string;
  name: string;
  logo_url?: string;
  description?: string;
  details?: string;
  address?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

// 创建企业时的数据类型（不包含自动生成的字段）
export interface CreateCompanyData {
  name: string;
  logo_url?: string;
  description?: string;
  details?: string;
  address?: string;
  website?: string;
}

// 更新企业时的数据类型（所有字段都是可选的）
export interface UpdateCompanyData {
  name?: string;
  logo_url?: string;
  description?: string;
  details?: string;
  address?: string;
  website?: string;
}

// 企业列表查询参数
export interface CompanyListParams {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: 'name' | 'created_at';
  sort_order?: 'asc' | 'desc';
} 