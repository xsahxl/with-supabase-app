'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/ui/loading';
import StatusBadge from '@/components/ui/status-badge';
import { getCompanyById, deleteCompany, updateCompanyStatus } from '@/lib/services/company';
import { Company, CompanyStatus } from '@/lib/types/company';

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

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

  const handleDelete = async () => {
    if (!company) return;

    if (!confirm(`确定要删除企业 "${company.name}" 吗？此操作不可撤销。`)) {
      return;
    }

    try {
      setDeleting(true);
      await deleteCompany(company.id);
      router.push('/companies');
    } catch (error) {
      console.error('删除企业失败:', error);
      alert(error instanceof Error ? error.message : '删除企业失败');
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusUpdate = async (newStatus: CompanyStatus) => {
    if (!company) return;

    const statusLabels = {
      draft: '草稿',
      pending: '待审核',
      approved: '审核通过',
      rejected: '审核不通过',
      archived: '已下架'
    };

    if (!confirm(`确定要将企业状态更改为"${statusLabels[newStatus]}"吗？`)) {
      return;
    }

    try {
      setUpdatingStatus(true);
      const updatedCompany = await updateCompanyStatus(company.id, newStatus);
      setCompany(updatedCompany);
      alert('状态更新成功！');
    } catch (error) {
      console.error('更新状态失败:', error);
      alert(error instanceof Error ? error.message : '更新状态失败');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex-1 w-full flex flex-col p-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loading />
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="flex-1 w-full flex flex-col p-6">
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
    <div className="flex-1 w-full flex flex-col p-6">
      <div className="mb-6">
        <Link href="/companies">
          <Button variant="outline" className="mb-4">
            ← 返回企业列表
          </Button>
        </Link>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <StatusBadge status={company.status} />
              <p className="text-gray-600">
                创建于 {formatDate(company.created_at)}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/companies/${company.id}/edit`}>
              <Button variant="outline">
                编辑
              </Button>
            </Link>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? '删除中...' : '删除'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主要信息 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Logo 和基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {company.logo_url && (
                <div className="flex items-center space-x-4">
                  <img
                    src={company.logo_url}
                    alt={`${company.name} logo`}
                    className="w-20 h-20 rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{company.name}</h3>
                    {company.description && (
                      <p className="text-gray-600 mt-1">{company.description}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {company.address && (
                  <Badge variant="secondary">
                    📍 {company.address}
                  </Badge>
                )}
                {company.website && (
                  <Badge variant="outline">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      🌐 访问官网
                    </a>
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 详细信息 */}
          {company.details && (
            <Card>
              <CardHeader>
                <CardTitle>详细信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{company.details}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          {/* 状态管理 */}
          <Card>
            <CardHeader>
              <CardTitle>状态管理</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">当前状态</p>
                <div className="mt-1">
                  <StatusBadge status={company.status} />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">状态更新时间</p>
                <p className="font-medium">{formatDate(company.status_updated_at)}</p>
              </div>

              {/* 状态操作按钮 */}
              <div className="space-y-2 pt-2">
                {company.status === 'draft' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleStatusUpdate('pending')}
                    disabled={updatingStatus}
                  >
                    提交审核
                  </Button>
                )}
                {company.status === 'pending' && (
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleStatusUpdate('approved')}
                      disabled={updatingStatus}
                    >
                      审核通过
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleStatusUpdate('rejected')}
                      disabled={updatingStatus}
                    >
                      审核不通过
                    </Button>
                  </div>
                )}
                {company.status === 'approved' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleStatusUpdate('archived')}
                    disabled={updatingStatus}
                  >
                    下架企业
                  </Button>
                )}
                {(company.status === 'rejected' || company.status === 'archived') && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleStatusUpdate('draft')}
                    disabled={updatingStatus}
                  >
                    重新编辑
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 时间信息 */}
          <Card>
            <CardHeader>
              <CardTitle>时间信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">创建时间</p>
                <p className="font-medium">{formatDate(company.created_at)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">更新时间</p>
                <p className="font-medium">{formatDate(company.updated_at)}</p>
              </div>
            </CardContent>
          </Card>

          {/* 快速操作 */}
          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/companies/${company.id}/edit`} className="block">
                <Button variant="outline" className="w-full justify-start">
                  ✏️ 编辑企业
                </Button>
              </Link>
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={handleDelete}
                disabled={deleting}
              >
                🗑️ {deleting ? '删除中...' : '删除企业'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 