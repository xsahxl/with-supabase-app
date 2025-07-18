'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CompanyForm from '@/components/company/company-form';
import { createCompany } from '@/lib/services/company';
import { CreateCompanyData } from '@/lib/types/company';

export default function CreateCompanyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateCompanyData | any, action: 'save' | 'submit') => {
    try {
      setIsLoading(true);

      // 根据操作类型设置状态
      const companyData = {
        ...data,
        status: action === 'save' ? 'draft' : 'pending'
      };

      await createCompany(companyData);

      if (action === 'save') {
        alert('草稿保存成功！');
        router.push('/companies');
      } else {
        alert('提交审核成功！请等待管理员审核。');
        router.push('/companies');
      }
    } catch (error) {
      console.error('操作失败:', error);
      alert(error instanceof Error ? error.message : '操作失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/companies');
  };

  return (
    <div className="flex-1 w-full flex flex-col p-6">
      <div className="mb-6">
        <Link href="/companies">
          <Button variant="outline" className="mb-4">
            ← 返回企业列表
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">创建企业</h1>
        <p className="text-gray-600 mt-2">
          添加新的企业信息到系统中，您可以先保存草稿，完善后再提交审核
        </p>
      </div>

      <CompanyForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
} 