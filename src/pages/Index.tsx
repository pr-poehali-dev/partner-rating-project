import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AffiliateProgram {
  id: number;
  name: string;
  logo: string;
  rating: number;
  commission: string;
  category: string;
  reviews: number;
  description: string;
  featured: boolean;
}

const affiliatePrograms: AffiliateProgram[] = [
  {
    id: 1,
    name: 'Amazon Associates',
    logo: 'A',
    rating: 4.8,
    commission: 'До 10%',
    category: 'E-commerce',
    reviews: 15240,
    description: 'Крупнейшая партнёрская программа с огромным выбором товаров',
    featured: true
  },
  {
    id: 2,
    name: 'AliExpress',
    logo: 'AE',
    rating: 4.6,
    commission: 'До 8%',
    category: 'E-commerce',
    reviews: 8950,
    description: 'Популярная международная площадка с высокими комиссиями',
    featured: true
  },
  {
    id: 3,
    name: 'Tinkoff',
    logo: 'T',
    rating: 4.9,
    commission: 'До 15%',
    category: 'Финансы',
    reviews: 12430,
    description: 'Банковские продукты и услуги с выгодными условиями',
    featured: true
  },
  {
    id: 4,
    name: 'Ozon',
    logo: 'O',
    rating: 4.5,
    commission: 'До 7%',
    category: 'E-commerce',
    reviews: 6780,
    description: 'Российский маркетплейс с широким ассортиментом',
    featured: false
  },
  {
    id: 5,
    name: 'Wildberries',
    logo: 'W',
    rating: 4.7,
    commission: 'До 9%',
    category: 'E-commerce',
    reviews: 9340,
    description: 'Лидер российского e-commerce рынка',
    featured: false
  },
  {
    id: 6,
    name: 'Booking.com',
    logo: 'B',
    rating: 4.8,
    commission: 'До 25%',
    category: 'Путешествия',
    reviews: 11250,
    description: 'Бронирование отелей по всему миру',
    featured: true
  }
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

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Icon
        key={i}
        name={i < Math.floor(rating) ? 'Star' : i < rating ? 'StarHalf' : 'Star'}
        size={16}
        className={i < rating ? 'fill-primary text-primary' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary via-primary/90 to-secondary py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
            РЕЙТИНГ ПАРТНЁРСКИХ ПРОГРАММ
          </h1>
          <p className="text-white/90 text-lg mb-8 animate-fade-in">
            Найдите лучшие партнёрские программы для монетизации вашего контента
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl animate-scale-in">
            <div className="flex-1 relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Поиск партнёрских программ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px] h-12 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Топ партнёрских программ</h2>
            <p className="text-muted-foreground">Найдено программ: {filteredPrograms.length}</p>
          </div>
          {compareList.length > 0 && (
            <Button className="bg-secondary hover:bg-secondary/90">
              <Icon name="GitCompare" className="mr-2" size={18} />
              Сравнить ({compareList.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program, index) => (
            <Card 
              key={program.id} 
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {program.featured && (
                <div className="absolute top-0 right-0 bg-gradient-to-br from-primary to-secondary text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                  ТОП
                </div>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-foreground">{program.logo}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{program.name}</h3>
                    <Badge variant="secondary" className="mt-1">{program.category}</Badge>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(program.id)}
                  className="p-2 hover:scale-110 transition-transform"
                >
                  <Icon
                    name="Heart"
                    size={20}
                    className={favorites.includes(program.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                  />
                </button>
              </div>

              <div className="flex items-center gap-1 mb-3">
                <div className="flex gap-0.5">{renderStars(program.rating)}</div>
                <span className="ml-2 font-bold text-lg">{program.rating}</span>
                <span className="text-muted-foreground text-sm ml-1">({program.reviews})</span>
              </div>

              <p className="text-muted-foreground text-sm mb-4 min-h-[40px]">
                {program.description}
              </p>

              <div className="bg-muted rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={18} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Комиссия</span>
                  </div>
                  <span className="font-bold text-primary">{program.commission}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => {}}
                >
                  Подробнее
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toggleCompare(program.id)}
                  className={compareList.includes(program.id) ? 'border-secondary text-secondary' : ''}
                >
                  <Icon name="GitCompare" size={18} />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Award" size={24} className="text-primary" />
            </div>
            <h3 className="font-bold text-2xl mb-1">200+</h3>
            <p className="text-muted-foreground text-sm">Программ в базе</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Percent" size={24} className="text-secondary" />
            </div>
            <h3 className="font-bold text-2xl mb-1">До 25%</h3>
            <p className="text-muted-foreground text-sm">Максимальная комиссия</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="TrendingUp" size={24} className="text-primary" />
            </div>
            <h3 className="font-bold text-2xl mb-1">50K+</h3>
            <p className="text-muted-foreground text-sm">Отзывов пользователей</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Users" size={24} className="text-secondary" />
            </div>
            <h3 className="font-bold text-2xl mb-1">10K+</h3>
            <p className="text-muted-foreground text-sm">Активных партнёров</p>
          </Card>
        </div>
      </main>

      <footer className="bg-foreground text-white mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Партнёрки</h3>
            <p className="text-white/70 text-sm">
              Ваш надёжный гид в мире партнёрского маркетинга
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Разделы</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Главная</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Рейтинг</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Категории</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Помощь</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Отзывы</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Сравнение</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Контакты</h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>info@partnerki.ru</p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Icon name="Twitter" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Icon name="Facebook" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Icon name="Instagram" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/50">
          © 2025 Партнёрки. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
