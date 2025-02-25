<?php
declare(strict_types=1);

namespace Api\Product\Command;

use Api\Base\Command\CommandInterface;
use Api\Product\Repositories\ProductRepositoryInterface;
use Api\Utils\SitemapReader;

class ProductImportFromSitemap implements CommandInterface
{
    private SitemapReader $xml;
    private ProductRepositoryInterface $repository;

    /**
     * @throws \Exception
     */
    public function __construct(string $filePath, ProductRepositoryInterface $repository)
    {
        $this->xml = new SitemapReader($filePath);
        $this->repository = $repository;
    }

    public function execute(): void
    {
        foreach($this->xml->items() as $item) {
            $this->repository->create($item);
        }
    }
}