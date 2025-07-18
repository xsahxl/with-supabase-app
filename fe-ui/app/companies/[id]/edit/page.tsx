'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Loading from '@/components/ui/loading';
import CompanyForm from '@/components/company/company-form';
import { getCompanyById, updateCompany } from '@/lib/services/company';
import { Company, UpdateCompanyData } from '@/lib/types/company';

export default function EditCompanyPage() {
  const params = useParams();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const companyId = params.id as string;

  useEffect(() => {
    const loadCompany = async () => {
      try {
        setLoading(true);
        const data = await getCompanyById(companyId);
        setCompany(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载企业详情失败');
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      loadCompany();
    }
  }, [companyId]);

  const handleSubmit = async (data: UpdateCompanyData | any) => {
    if (!company) return;

    try {
      setIsSubmitting(true);
      await updateCompany(company.id, data);
      router.push(`/companies/${company.id}`);
    } catch (error) {
      console.error('更新企业失败:', error);
      alert(error instanceof Error ? error.message : '更新企业失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (company) {
      router.push(`/companies/${company.id}`);
    } else {
      router.push('/companies');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loading />
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error || '企业不存在'}</p>
            <Link href="/companies">
              <Button variant="outline" className="mt-4">
                返回企业列表
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/companies/${company.id}`}>
          <Button variant="outline" className="mb-4">
            ← 返回企业详情
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">编辑企业</h1>
        <p className="text-gray-600 mt-2">
          修改企业 "{company.name}" 的信息
        </p>
      </div>

      <CompanyForm
        company={company}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isSubmitting}
      />
    </div>
  );
} 