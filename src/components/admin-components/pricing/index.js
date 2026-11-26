'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const OPTION_LABELS = {
  '1_color': '1 цвет',
  '2_colors': '2 цвета',
  next_color: 'След. цвет',
  '3_layers': '3 слоя',
  '2_layers': '2 слоя',
  '1_side': '1 сторона',
  '2_sides': '2 стороны',
  default: 'Цена за шт.',
  min: 'Минимальная цена',
  price: 'Базовая цена',
  coefficient: 'Коэффициент',
  preparation: 'Подготовка',
};

// Поля, которые НЕ являются ценой в евро и не должны умножаться на курс
const NON_CURRENCY_KEYS = new Set(['min', 'coefficient']);

function isMonetaryField(quantity, optionKey) {
  if (quantity !== null && quantity !== undefined) return true;
  return !NON_CURRENCY_KEYS.has(optionKey);
}

function toDisplayPrice(eurValue, rate, isMonetary) {
  const num = Number(eurValue);
  if (!isMonetary) return num;
  return Math.round(num * rate * 100) / 100;
}

function toDatabaseEur(localValue, rate, isMonetary) {
  const num = Number(localValue);
  if (!isMonetary) return num;
  return Math.round((num / rate) * 10000) / 10000;
}

function formatOptionLabel(key) {
  return OPTION_LABELS[key] || key;
}

function makeCellKey(productSlug, operationSlug, quantity, optionKey) {
  return `${productSlug}::${operationSlug}::${quantity ?? 'FLAT'}::${optionKey}`;
}

const PageWrapper = styled.main`
  min-height: 100vh;
  background-color: var(--adminBg);
  color: var(--adminText);
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px 96px;
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid var(--adminBorder);
  padding-bottom: 24px;
  margin-bottom: 24px;
`;

const TitleBlock = styled.div``;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--adminText);
`;

const Subtitle = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--adminMuted);
`;

const RateBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  background-color: ${({ $isFallback }) => ($isFallback ? 'var(--adminFallbackBg)' : 'var(--adminRateBg)')};
  color: ${({ $isFallback }) => ($isFallback ? 'var(--adminFallbackText)' : 'var(--adminRateText)')};
  border: 1px solid ${({ $isFallback }) => ($isFallback ? 'var(--adminFallbackBorder)' : 'var(--adminRateBorder)')};
`;

const TabsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ProductTab = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  background-color: ${({ $active }) => ($active ? 'var(--adminTabActiveBg)' : 'var(--adminTabBg)')};
  color: ${({ $active }) => ($active ? 'var(--adminTabActiveText)' : 'var(--adminTabText)')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--adminTabActiveBg)' : 'var(--adminTabBorder)')};
  box-shadow: ${({ $active }) => ($active ? '0 1px 2px rgba(0, 0, 0, 0.15)' : 'none')};

  &:hover {
    background-color: ${({ $active }) => ($active ? 'var(--adminTabActiveHoverBg)' : 'var(--adminTabHoverBg)')};
  }
`;

const TabSlug = styled.span`
  margin-left: 6px;
  font-size: 12px;
  opacity: 0.75;
`;

const StatusBanner = styled.div`
  margin-bottom: 24px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid ${({ $type }) => ($type === 'success' ? 'var(--adminSuccessBorder)' : 'var(--adminFallbackBorder)')};
  background-color: ${({ $type }) => ($type === 'success' ? 'var(--adminSuccessBg)' : 'var(--adminFallbackBg)')};
  color: ${({ $type }) => ($type === 'success' ? 'var(--adminSuccessText)' : 'var(--adminFallbackText)')};
`;

const EmptyState = styled.div`
  background-color: var(--adminCardBg);
  border: 1px solid var(--adminBorder);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  color: var(--adminMuted);
  font-size: 15px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Card = styled.section`
  background-color: var(--adminCardBg);
  border: 1px solid var(--adminBorder);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 16px 20px;
  background-color: var(--adminCardHeaderBg);
  border-bottom: 1px solid var(--adminBorder);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--adminText);
`;

const CardSlug = styled.span`
  display: block;
  margin-top: 2px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  color: var(--adminMuted);
`;

const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  background-color: ${({ $variant }) => ($variant === 'flat' ? 'var(--adminFlatBadgeBg)' : 'var(--adminBadgeBg)')};
  color: ${({ $variant }) => ($variant === 'flat' ? 'var(--adminFlatBadgeText)' : 'var(--adminBadgeText)')};
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
`;

const Thead = styled.thead`
  background-color: var(--adminTheadBg);
  color: var(--adminTheadText);
  border-bottom: 1px solid var(--adminBorder);
`;

const Th = styled.th`
  padding: 12px 16px;
  font-weight: 500;
  text-align: ${({ $align }) => $align || 'left'};
  width: ${({ $width }) => $width || 'auto'};
`;

const ThSub = styled.div`
  font-size: 11px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 400;
  color: var(--adminSubText);
  margin-top: 2px;
`;

const Tr = styled.tr`
  border-bottom: 1px solid var(--adminRowBorder);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--adminRowHover);
  }
`;

const Td = styled.td`
  padding: 8px 16px;
  color: var(--adminTdText);
  font-weight: ${({ $bold }) => ($bold ? 600 : 400)};
  white-space: ${({ $nowrap }) => ($nowrap ? 'nowrap' : 'normal')};
  vertical-align: top;
`;

const MonoTd = styled(Td)`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  color: var(--adminMuted);
  vertical-align: middle;
`;

const PriceInput = styled.input`
  width: 100%;
  min-width: 90px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid ${({ $dirty }) => ($dirty ? 'var(--adminInputDirtyBorder)' : 'var(--adminInputBorder)')};
  background-color: ${({ $dirty }) => ($dirty ? 'var(--adminInputDirtyBg)' : 'var(--adminInputBg)')};
  color: ${({ $dirty }) => ($dirty ? 'var(--adminInputDirtyText)' : 'var(--adminText)')};
  font-weight: ${({ $dirty }) => ($dirty ? 600 : 400)};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
  text-align: right;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: var(--adminInputFocusBorder);
    box-shadow: 0 0 0 2px var(--adminInputFocusRing);
  }
`;

const EurHint = styled.div`
  margin-top: 3px;
  text-align: right;
  font-size: 11px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: ${({ $dirty }) => ($dirty ? 'var(--adminDirtyAccent)' : 'var(--adminSubText)')};
`;

const FloatingSaveBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--adminSaveBarBg);
  backdrop-filter: blur(8px);
  border-top: 1px solid var(--adminBorder);
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.18);
  z-index: 50;
`;

const SaveBarInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const DirtyCounter = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--adminDirtyAccent);
`;

const ValidationError = styled.span`
  margin-left: 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--adminErrorText);
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SecondaryButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--adminTabBorder);
  background-color: var(--adminSecondaryBtnBg);
  color: var(--adminSecondaryBtnText);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: var(--adminSecondaryBtnHoverBg);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled.button`
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  background-color: var(--adminPrimaryBtnBg);
  color: var(--adminPrimaryBtnText);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: var(--adminPrimaryBtnHoverBg);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* ==================== COMPONENT ==================== */

export default function PricingAdmin({ products, operations, initialPricing, eurRateInfo }) {
  const router = useRouter();
  const eurRate = eurRateInfo?.rate || 1;

  const [selectedProduct, setSelectedProduct] = useState(products[0]?.slug || Object.keys(initialPricing)[0] || '');
  // Храним эталон в EUR (как в БД)
  const [savedPricing, setSavedPricing] = useState(initialPricing);
  // Храним черновики в локальной валюте (строки из input)
  const [drafts, setDrafts] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const operationNamesMap = useMemo(() => {
    const map = {};
    for (const op of operations) {
      map[op.slug] = op.name;
    }
    return map;
  }, [operations]);

  const currentProductData = savedPricing[selectedProduct] || {};

  const pendingUpdates = useMemo(() => {
    const list = [];

    for (const [cellKey, rawDraftValue] of Object.entries(drafts)) {
      const [productSlug, operationSlug, qtyPart, optionKey] = cellKey.split('::');
      const quantity = qtyPart === 'FLAT' ? null : Number(qtyPart);
      const monetary = isMonetaryField(quantity, optionKey);

      const originalEur =
        quantity === null
          ? savedPricing?.[productSlug]?.[operationSlug]?.[optionKey]
          : savedPricing?.[productSlug]?.[operationSlug]?.[String(quantity)]?.[optionKey];

      if (originalEur === undefined) continue;

      const originalDisplay = toDisplayPrice(originalEur, eurRate, monetary);
      const parsedDraft = Number(rawDraftValue);

      if (rawDraftValue === '' || !Number.isFinite(parsedDraft) || parsedDraft < 0) {
        list.push({
          cellKey,
          productSlug,
          operationSlug,
          quantity,
          optionKey,
          dbValue: null,
          isValid: false,
        });
      } else if (parsedDraft !== originalDisplay) {
        list.push({
          cellKey,
          productSlug,
          operationSlug,
          quantity,
          optionKey,
          // Делим введённую цену обратно на курс EUR для записи в БД
          dbValue: toDatabaseEur(parsedDraft, eurRate, monetary),
          isValid: true,
        });
      }
    }

    return list;
  }, [drafts, savedPricing, eurRate]);

  const hasInvalidValues = pendingUpdates.some((item) => !item.isValid);

  function handleCellChange(productSlug, operationSlug, quantity, optionKey, rawValue) {
    const cellKey = makeCellKey(productSlug, operationSlug, quantity, optionKey);
    const monetary = isMonetaryField(quantity, optionKey);
    setStatusMessage(null);

    const originalEur =
      quantity === null
        ? savedPricing?.[productSlug]?.[operationSlug]?.[optionKey]
        : savedPricing?.[productSlug]?.[operationSlug]?.[String(quantity)]?.[optionKey];

    const originalDisplay = toDisplayPrice(originalEur, eurRate, monetary);

    if (rawValue !== '' && Number(rawValue) === originalDisplay) {
      setDrafts((prev) => {
        const copy = { ...prev };
        delete copy[cellKey];
        return copy;
      });
      return;
    }

    setDrafts((prev) => ({
      ...prev,
      [cellKey]: rawValue,
    }));
  }

  function getCellState(productSlug, operationSlug, quantity, optionKey, originalEur) {
    const cellKey = makeCellKey(productSlug, operationSlug, quantity, optionKey);
    const monetary = isMonetaryField(quantity, optionKey);
    const originalDisplay = toDisplayPrice(originalEur, eurRate, monetary);

    const hasDraft = Object.prototype.hasOwnProperty.call(drafts, cellKey);
    const displayValue = hasDraft ? drafts[cellKey] : String(originalDisplay);

    const parsedNum = Number(displayValue);
    const isValidNum = displayValue !== '' && Number.isFinite(parsedNum) && parsedNum >= 0;
    const dirty = hasDraft && (!isValidNum || parsedNum !== originalDisplay);

    const previewEur = monetary ? (isValidNum ? (dirty ? toDatabaseEur(parsedNum, eurRate, true) : Number(originalEur)) : null) : null;

    return { displayValue, dirty, monetary, previewEur };
  }

  function handleReset() {
    setDrafts({});
    setStatusMessage(null);
  }

  async function handleSave() {
    if (pendingUpdates.length === 0 || hasInvalidValues) return;

    setIsSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/pricing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          updates: pendingUpdates.map(({ productSlug, operationSlug, quantity, optionKey, dbValue }) => ({
            productSlug,
            operationSlug,
            quantity,
            optionKey,
            value: dbValue,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при сохранении');
      }

      const nextPricing = structuredClone(savedPricing);
      for (const item of pendingUpdates) {
        if (item.quantity === null) {
          nextPricing[item.productSlug][item.operationSlug][item.optionKey] = item.dbValue;
        } else {
          nextPricing[item.productSlug][item.operationSlug][String(item.quantity)][item.optionKey] = item.dbValue;
        }
      }

      setSavedPricing(nextPricing);
      setDrafts({});
      setStatusMessage({
        type: 'success',
        text: `Сохранено изменений в БД (в EUR): ${data.updatedCount}`,
      });
      router.refresh();
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Не удалось сохранить данные',
      });
    } finally {
      setIsSaving(false);
    }
  }

  const operationEntries = Object.entries(currentProductData);

  return (
    <PageWrapper>
      <Container>
        <Header>
          <TitleBlock>
            <Title>Прайс-лист типографии</Title>
            <Subtitle>Цены отображаются в гривне, а в базу сохраняются в евро по курсу на 1-е число</Subtitle>
            <RateBadge $isFallback={eurRateInfo?.isFallback}>
              {eurRateInfo?.isFallback
                ? `Не удалось загрузить курс НБУ на ${eurRateInfo?.date} (используется курс ${eurRate})`
                : `Курс НБУ на ${eurRateInfo?.date}: 1 EUR = ${eurRate} ₴`}
            </RateBadge>
          </TitleBlock>

          <TabsGroup>
            {products.map((product) => (
              <ProductTab
                key={product.slug}
                type="button"
                $active={product.slug === selectedProduct}
                onClick={() => setSelectedProduct(product.slug)}
              >
                {product.name}
                <TabSlug>({product.slug})</TabSlug>
              </ProductTab>
            ))}
          </TabsGroup>
        </Header>

        {statusMessage && <StatusBanner $type={statusMessage.type}>{statusMessage.text}</StatusBanner>}

        {operationEntries.length === 0 ? (
          <EmptyState>Для выбранного продукта пока нет цен в базе данных.</EmptyState>
        ) : (
          <CardsGrid>
            {operationEntries.map(([operationSlug, opData]) => {
              const keys = Object.keys(opData);
              const firstValue = opData[keys[0]];
              const isTiered = firstValue !== null && typeof firstValue === 'object';

              if (!isTiered) {
                return (
                  <Card key={operationSlug}>
                    <CardHeader>
                      <div>
                        <CardTitle>{operationNamesMap[operationSlug] || operationSlug}</CardTitle>
                        <CardSlug>{operationSlug}</CardSlug>
                      </div>
                      <Badge $variant="flat">Параметры</Badge>
                    </CardHeader>

                    <TableWrapper>
                      <Table>
                        <Thead>
                          <tr>
                            <Th>Параметр</Th>
                            <Th>Ключ</Th>
                            <Th $width="170px" $align="right">
                              Значение
                            </Th>
                          </tr>
                        </Thead>
                        <tbody>
                          {keys.map((optionKey) => {
                            const origEur = opData[optionKey];
                            const { displayValue, dirty, monetary, previewEur } = getCellState(
                              selectedProduct,
                              operationSlug,
                              null,
                              optionKey,
                              origEur,
                            );

                            return (
                              <Tr key={optionKey}>
                                <Td $bold>{formatOptionLabel(optionKey)}</Td>
                                <MonoTd>{optionKey}</MonoTd>
                                <Td>
                                  <PriceInput
                                    type="number"
                                    step="any"
                                    min="0"
                                    $dirty={dirty}
                                    value={displayValue}
                                    onChange={(e) => handleCellChange(selectedProduct, operationSlug, null, optionKey, e.target.value)}
                                  />
                                  {monetary && <EurHint $dirty={dirty}>{previewEur !== null ? `${previewEur} €` : '—'}</EurHint>}
                                </Td>
                              </Tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </TableWrapper>
                  </Card>
                );
              }

              const sortedQuantities = keys.sort((a, b) => Number(a) - Number(b));
              const optionColumns = Object.keys(opData[sortedQuantities[0]] || {});

              return (
                <Card key={operationSlug}>
                  <CardHeader>
                    <div>
                      <CardTitle>{operationNamesMap[operationSlug] || operationSlug}</CardTitle>
                      <CardSlug>{operationSlug}</CardSlug>
                    </div>
                    <Badge $variant="tiered">Тиражная сетка (₴)</Badge>
                  </CardHeader>

                  <TableWrapper>
                    <Table>
                      <Thead>
                        <tr>
                          <Th $width="100px">Тираж</Th>
                          {optionColumns.map((colKey) => (
                            <Th key={colKey} $align="right">
                              <div>{formatOptionLabel(colKey)}</div>
                              <ThSub>{colKey}</ThSub>
                            </Th>
                          ))}
                        </tr>
                      </Thead>
                      <tbody>
                        {sortedQuantities.map((qtyStr) => {
                          const qtyNum = Number(qtyStr);
                          const rowOptions = opData[qtyStr] || {};

                          return (
                            <Tr key={qtyStr}>
                              <Td $bold $nowrap>
                                {qtyStr} шт.
                              </Td>
                              {optionColumns.map((optionKey) => {
                                const origEur = rowOptions[optionKey];
                                const { displayValue, dirty, previewEur } = getCellState(selectedProduct, operationSlug, qtyNum, optionKey, origEur);

                                return (
                                  <Td key={optionKey}>
                                    <PriceInput
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      $dirty={dirty}
                                      value={displayValue}
                                      onChange={(e) => handleCellChange(selectedProduct, operationSlug, qtyNum, optionKey, e.target.value)}
                                    />
                                    <EurHint $dirty={dirty}>{previewEur !== null ? `${previewEur} €` : '—'}</EurHint>
                                  </Td>
                                );
                              })}
                            </Tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </TableWrapper>
                </Card>
              );
            })}
          </CardsGrid>
        )}

        {pendingUpdates.length > 0 && (
          <FloatingSaveBar>
            <SaveBarInner>
              <div>
                <DirtyCounter>Изменено ячеек: {pendingUpdates.length}</DirtyCounter>
                {hasInvalidValues && <ValidationError>Проверьте корректность введённых чисел</ValidationError>}
              </div>

              <ActionsGroup>
                <SecondaryButton type="button" onClick={handleReset} disabled={isSaving}>
                  Отменить
                </SecondaryButton>
                <PrimaryButton type="button" onClick={handleSave} disabled={isSaving || hasInvalidValues}>
                  {isSaving ? 'Сохранение...' : 'Сохранить в EUR'}
                </PrimaryButton>
              </ActionsGroup>
            </SaveBarInner>
          </FloatingSaveBar>
        )}
      </Container>
    </PageWrapper>
  );
}
