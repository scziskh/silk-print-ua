export async function getFirstOfMonthEurRate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');

  // Формат YYYYMMDD для API НБУ (всегда 1-е число текущего месяца)
  const apiDate = `${year}${month}01`;
  const displayDate = `01.${month}.${year}`;

  const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=${apiDate}&json`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 86400 }, // кэшируем на сутки
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const rate = Array.isArray(data) ? Number(data[0]?.rate) : NaN;

    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error('Некорректный курс в ответе НБУ');
    }

    return {
      rate,
      date: displayDate,
      isFallback: false,
    };
  } catch (error) {
    console.error('Ошибка получения курса EUR от НБУ:', error);

    // Резервный курс из .env (например, FALLBACK_EUR_RATE=45.0), если API недоступен
    const fallback = Number(process.env.FALLBACK_EUR_RATE) || 1;
    return {
      rate: fallback,
      date: displayDate,
      isFallback: true,
    };
  }
}
