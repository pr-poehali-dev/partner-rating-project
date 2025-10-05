import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AffiliateProgram {
  id: number;
  name: string;
  logo: string;
  rating: number;
  commission: string;
  commissionNum: number;
  category: string;
  reviews: number;
  description: string;
  featured: boolean;
  conversion: number;
  avgPayout: number;
  growth: number;
}

const affiliatePrograms: AffiliateProgram[] = [
  {
    id: 1,
    name: 'Amazon Associates',
    logo: 'A',
    rating: 4.8,
    commission: 'До 10%',
    commissionNum: 10,
    category: 'E-commerce',
    reviews: 15240,
    description: 'Крупнейшая партнёрская программа с огромным выбором товаров',
    featured: true,
    conversion: 3.2,
    avgPayout: 45,
    growth: 12
  },
  {
    id: 2,
    name: 'AliExpress',
    logo: 'AE',
    rating: 4.6,
    commission: 'До 8%',
    commissionNum: 8,
    category: 'E-commerce',
    reviews: 8950,
    description: 'Популярная международная площадка с высокими комиссиями',
    featured: true,
    conversion: 2.8,
    avgPayout: 32,
    growth: 8
  },
  {
    id: 3,
    name: 'Tinkoff',
    logo: 'T',
    rating: 4.9,
    commission: 'До 15%',
    commissionNum: 15,
    category: 'Финансы',
    reviews: 12430,
    description: 'Банковские продукты и услуги с выгодными условиями',
    featured: true,
    conversion: 4.5,
    avgPayout: 89,
    growth: 25
  },
  {
    id: 4,
    name: 'Ozon',
    logo: 'O',
    rating: 4.5,
    commission: 'До 7%',
    commissionNum: 7,
    category: 'E-commerce',
    reviews: 6780,
    description: 'Российский маркетплейс с широким ассортиментом',
    featured: false,
    conversion: 2.5,
    avgPayout: 28,
    growth: 5
  },
  {
    id: 5,
    name: 'Wildberries',
    logo: 'W',
    rating: 4.7,
    commission: 'До 9%',
    commissionNum: 9,
    category: 'E-commerce',
    reviews: 9340,
    description: 'Лидер российского e-commerce рынка',
    featured: false,
    conversion: 3.0,
    avgPayout: 35,
    growth: 15
  },
  {
    id: 6,
    name: 'Booking.com',
    logo: 'B',
    rating: 4.8,
    commission: 'До 25%',
    commissionNum: 25,
    category: 'Путешествия',
    reviews: 11250,
    description: 'Бронирование отелей по всему миру',
    featured: true,
    conversion: 5.2,
    avgPayout: 120,
    growth: 18
  }
];

const monthlyData = [
  { month: 'Янв', revenue: 4200, clicks: 12400, conversions: 380 },
  { month: 'Фев', revenue: 5100, clicks: 14200, conversions: 450 },
  { month: 'Мар', revenue: 6800, clicks: 16800, conversions: 520 },
  { month: 'Апр', revenue: 7200, clicks: 18200, conversions: 580 },
  { month: 'Май', revenue: 8500, clicks: 21400, conversions: 680 },
  { month: 'Июн', revenue: 9800, clicks: 24600, conversions: 780 }
];

const categoryData = [
  { name: 'E-commerce', value: 45, color: '#FF6B35' },
  { name: 'Финансы', value: 25, color: '#4ECDC4' },
  { name: 'Путешествия', value: 15, color: '#1A1A2E' },
  { name: 'Образование', value: 10, color: '#F7931E' },
  { name: 'Технологии', value: 5, color: '#95E1D3' }
];

const topPerformers = [
  { name: 'Booking.com', earnings: 12500, trend: 'up' },
  { name: 'Tinkoff', earnings: 9800, trend: 'up' },
  { name: 'Amazon', earnings: 8200, trend: 'up' },
  { name: 'Wildberries', earnings: 6100, trend: 'down' },
  { name: 'AliExpress', earnings: 5400, trend: 'up' }
];

const categories = ['Все категории', 'E-commerce', 'Финансы', 'Путешествия', 'Образование', 'Технологии'];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);

  const filteredPrograms = affiliatePrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все категории' || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: number) => {
    setCompareList(prev => 
      prev.includes(id) ? prev.filter(comp => comp !== id) : [...prev, id]
    );
  };

  const totalRevenue = monthlyData.reduce((sum, item) => sum + item.revenue, 0);
  const totalClicks = monthlyData.reduce((sum, item) => sum + item.clicks, 0);
  const totalConversions = monthlyData.reduce((sum, item) => sum + item.conversions, 0);
  const avgConversion = ((totalConversions / totalClicks) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="BarChart3" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold">Партнёрский Дашборд</h1>
                <p className="text-sm text-muted-foreground">Аналитика и рейтинг программ</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
              <Button size="sm" className="bg-primary">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить программу
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-5 border-l-4 border-l-primary">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Общий доход</p>
              <Icon name="DollarSign" size={18} className="text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">${totalRevenue.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Icon name="TrendingUp" size={12} />
              <span>+18.2% за месяц</span>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-secondary">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Кликов</p>
              <Icon name="MousePointerClick" size={18} className="text-secondary" />
            </div>
            <p className="text-3xl font-bold mb-1">{totalClicks.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Icon name="TrendingUp" size={12} />
              <span>+12.5% за месяц</span>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-primary">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Конверсий</p>
              <Icon name="Target" size={18} className="text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">{totalConversions.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Icon name="TrendingUp" size={12} />
              <span>+8.3% за месяц</span>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-secondary">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Конверсия</p>
              <Icon name="Percent" size={18} className="text-secondary" />
            </div>
            <p className="text-3xl font-bold mb-1">{avgConversion}%</p>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Icon name="TrendingUp" size={12} />
              <span>+2.1% за месяц</span>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Динамика дохода</h2>
              <Select defaultValue="6months">
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 месяц</SelectItem>
                  <SelectItem value="3months">3 месяца</SelectItem>
                  <SelectItem value="6months">6 месяцев</SelectItem>
                  <SelectItem value="1year">1 год</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#FF6B35" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold mb-6">Распределение по категориям</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Топ исполнители</h2>
            <div className="space-y-3">
              {topPerformers.map((performer, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="font-medium text-sm">{performer.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">${performer.earnings.toLocaleString()}</span>
                    <Icon 
                      name={performer.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                      size={16} 
                      className={performer.trend === 'up' ? 'text-green-600' : 'text-red-600'} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-2 p-6">
            <h2 className="text-lg font-bold mb-6">Сравнение программ</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={affiliatePrograms.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" fontSize={11} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="commissionNum" fill="#FF6B35" name="Комиссия %" radius={[8, 8, 0, 0]} />
                <Bar dataKey="avgPayout" fill="#4ECDC4" name="Ср. выплата $" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold mb-1">Каталог партнёрских программ</h2>
              <p className="text-sm text-muted-foreground">Найдено: {filteredPrograms.length} программ</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-[300px]">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {compareList.length > 0 && (
                <Button variant="outline">
                  <Icon name="GitCompare" className="mr-2" size={18} />
                  Сравнить ({compareList.length})
                </Button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Программа</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Категория</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Рейтинг</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Комиссия</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Конверсия</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Ср. выплата</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Рост</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((program) => (
                  <tr key={program.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-foreground">{program.logo}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{program.name}</p>
                          <p className="text-xs text-muted-foreground">{program.reviews.toLocaleString()} отзывов</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary" className="text-xs">{program.category}</Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Icon name="Star" size={14} className="fill-primary text-primary" />
                        <span className="font-semibold text-sm">{program.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-bold text-primary">{program.commission}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-sm font-medium">{program.conversion}%</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-sm font-medium">${program.avgPayout}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Icon name="TrendingUp" size={14} className="text-green-600" />
                        <span className="text-sm font-medium text-green-600">+{program.growth}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleFavorite(program.id)}
                        >
                          <Icon
                            name="Heart"
                            size={16}
                            className={favorites.includes(program.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleCompare(program.id)}
                          className={compareList.includes(program.id) ? 'text-secondary' : ''}
                        >
                          <Icon name="GitCompare" size={16} />
                        </Button>
                        <Button size="sm" variant="default" className="bg-primary">
                          Подробнее
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-bold mb-1">Ничего не найдено</h3>
              <p className="text-sm text-muted-foreground">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
