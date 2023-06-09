import React from 'react';
import { requestData } from '@/utils/fetch';
import RestaurantsList from '@/components/Restaurants/RestaurantsList';
import ProductsList from '@/components/Products/ProductsList';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/next-auth';
import { Role } from '@prisma/client';
import ManagerOptions from '@/components/ManagerOptions/ManagerOptions';

export default async function RestaurantPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const restaurantId = params.restaurantId;

  const allRestaurants = await requestData('/api/restaurants', {cache: 'no-cache'});
  const currentRestaurants = await requestData(
    `/api/restaurants?id=${restaurantId}`, {cache: 'no-cache'}
  );
  const session = await getServerSession(authOptions);

  return (
    <div style={{ maxWidth: '100vw' }}>
      <RestaurantsList restaurants={allRestaurants.restaurants} />
      <div style={{ width: '100%'}}>
        {session?.user?.role === Role.MANAGER && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <ManagerOptions />
          </div>
        )}
        <ProductsList products={currentRestaurants.restaurant.products} />
      </div>
    </div>
  );
}
