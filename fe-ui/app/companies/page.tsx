'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/ui/loading';
import CompanyCard from '@/components/company/company-card';
import { getCompanies } from '@/lib/services/company';
import { Company } from '@/lib/types/company';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const loadCompanies = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const result = await getCompanies({
        page,
        limit: 12,
        search: search || undefined
      });

      setCompanies(result.companies);
      setTotalPages(result.totalPages);
      setTotal(result.total);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载企业列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleSearch = () => {
    loadCompanies(1, searchTerm);
  };

  const handlePageChange = (page: number) => {
    loadCompanies(page, searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading && companies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">企业列表</h1>
            <p className="text-gray-600 mt-2">
              共 {total} 家企业
            </p>
          </div>
          <Link href="/companies/create">
            <Button>
              添加企业
            </Button>
          </Link>
        </div>

        {/* 搜索栏 */}
        <div className="flex gap-2 mb-6">
          <Input
            type="text"
            placeholder="搜索企业名称或描述..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            搜索
          </Button>
        </div>
      </div>

      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {companies.length === 0 && !loading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                {searchTerm ? '没有找到匹配的企业' : '暂无企业数据'}
              </p>
              {!searchTerm && (
                <Link href="/companies/create">
                  <Button>
                    添加第一个企业
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* 企业网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                上一页
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                下一页
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
} 