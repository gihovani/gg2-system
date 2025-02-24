<?php
declare(strict_types=1);

namespace Api\Utils;

class SitemapReader
{
    public \SimpleXMLElement $xml;

    public function __construct($filePath)
    {
        $xml = simplexml_load_file($filePath);
        if ($xml === false) {
            throw new \Exception("Falha ao carregar o XML ($filePath).");
        }
        $this->xml = $xml;
    }

    private function formatPrice(string $price): float
    {
        $price = str_replace(' BRL', '', $price);
        return floatval($price);
    }

    private function formatWeight(string $weight): float
    {
        $weight = str_replace(' kg', '', $weight);
        return floatval($weight);
    }

    public function items(array $keys = [], $namespaces = ['g']): array
    {
        $items = [];
        foreach ($this->xml->channel->item as $item) {
            $data = [];
            foreach ($namespaces as $ns) {
                $children = $item->children($ns, true);
                foreach ($children as $ch) {
                    if (empty($keys) || in_array($ch->getName(), $keys)) {
                        $data[$ch->getName()] = trim((string)$ch);
                    }
                }
            }
            $price = $this->formatPrice($data['price'] ?? '');
            $weight = $this->formatWeight($data['shipping_weight'] ?? '');
            $item = [
                'id' => $data['id'] ?? '',
                'title' => $data['title'] ?? '',
                'description' => $data['description'] ?? '',
                'link' => $data['link'] ?? '',
                'image_link' => $data['image_link'] ?? '',
                'price' => $price,
                'sale_price' => $data['sale_price'] ?? '',
                'sale_price_effective_date' => $data['sale_price_effective_date'] ?? '',
                'brand' => $data['brand'] ?? '',
                'gtin' => $data['gtin'] ?? '',
                'mpn' => $data['mpn'] ?? '',
                'condition' => $data['condition'] ?? '',
                'shipping_weight' => $weight,
                'availability' => $data['availability'] ?? '',
                'sku' => $data['sku'] ?? '',
                'product_type' => $data['product_type'] ?? '',
            ];
            $items[] = $item;
        }
        return $items;
    }
}
