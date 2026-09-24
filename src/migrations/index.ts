import * as migration_20260724_081731 from './20260724_081731';
import * as migration_20260724_113238_solutions_page_door_prices from './20260724_113238_solutions_page_door_prices';
import * as migration_20260724_114730_solutions_page_window_prices from './20260724_114730_solutions_page_window_prices';
import * as migration_20260725_160000_homepage_promo_banner from './20260725_160000_homepage_promo_banner';
import * as migration_20260725_213211_tz_content_and_crm from './20260725_213211_tz_content_and_crm';
import * as migration_20260726_172500_homepage_reference_redesign from './20260726_172500_homepage_reference_redesign';
import * as migration_20260726_224557_documents_preview_image from './20260726_224557_documents_preview_image';
import * as migration_20260727_081500_hero_images_refresh from './20260727_081500_hero_images_refresh';
import * as migration_20260727_220000_office_coordinates from './20260727_220000_office_coordinates';
import * as migration_20260728_194958 from './20260728_194958';
import * as migration_20260729_003000_product_images_and_office_count from './20260729_003000_product_images_and_office_count';
import * as migration_20260729_120000_pvc_product_characteristics from './20260729_120000_pvc_product_characteristics';
import * as migration_20260729_130000_fix_homepage_office_count from './20260729_130000_fix_homepage_office_count';
import * as migration_20260804_000736_supplier_documents from './20260804_000736_supplier_documents';

export const migrations = [
  {
    up: migration_20260724_081731.up,
    down: migration_20260724_081731.down,
    name: '20260724_081731',
  },
  {
    up: migration_20260724_113238_solutions_page_door_prices.up,
    down: migration_20260724_113238_solutions_page_door_prices.down,
    name: '20260724_113238_solutions_page_door_prices',
  },
  {
    up: migration_20260724_114730_solutions_page_window_prices.up,
    down: migration_20260724_114730_solutions_page_window_prices.down,
    name: '20260724_114730_solutions_page_window_prices',
  },
  {
    up: migration_20260725_160000_homepage_promo_banner.up,
    down: migration_20260725_160000_homepage_promo_banner.down,
    name: '20260725_160000_homepage_promo_banner',
  },
  {
    up: migration_20260725_213211_tz_content_and_crm.up,
    down: migration_20260725_213211_tz_content_and_crm.down,
    name: '20260725_213211_tz_content_and_crm',
  },
  {
    up: migration_20260726_172500_homepage_reference_redesign.up,
    down: migration_20260726_172500_homepage_reference_redesign.down,
    name: '20260726_172500_homepage_reference_redesign',
  },
  {
    up: migration_20260726_224557_documents_preview_image.up,
    down: migration_20260726_224557_documents_preview_image.down,
    name: '20260726_224557_documents_preview_image',
  },
  {
    up: migration_20260727_081500_hero_images_refresh.up,
    down: migration_20260727_081500_hero_images_refresh.down,
    name: '20260727_081500_hero_images_refresh',
  },
  {
    up: migration_20260727_220000_office_coordinates.up,
    down: migration_20260727_220000_office_coordinates.down,
    name: '20260727_220000_office_coordinates',
  },
  {
    up: migration_20260728_194958.up,
    down: migration_20260728_194958.down,
    name: '20260728_194958',
  },
  {
    up: migration_20260729_003000_product_images_and_office_count.up,
    down: migration_20260729_003000_product_images_and_office_count.down,
    name: '20260729_003000_product_images_and_office_count',
  },
  {
    up: migration_20260729_120000_pvc_product_characteristics.up,
    down: migration_20260729_120000_pvc_product_characteristics.down,
    name: '20260729_120000_pvc_product_characteristics',
  },
  {
    up: migration_20260729_130000_fix_homepage_office_count.up,
    down: migration_20260729_130000_fix_homepage_office_count.down,
    name: '20260729_130000_fix_homepage_office_count',
  },
  {
    up: migration_20260804_000736_supplier_documents.up,
    down: migration_20260804_000736_supplier_documents.down,
    name: '20260804_000736_supplier_documents'
  },
];
