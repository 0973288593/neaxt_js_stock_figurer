export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>Edit Product</h1>
      <p>ID: {params.id}</p>
    </div>
  );
}

// async function getProduct(id: string) {
//   const res = await fetch(`http://localhost:3000/api/products/${id}`, {
//     cache: "no-store",
//   });

//   return res.json();
// }

// export default async function EditProductPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const product = await getProduct(params.id);

//   return (
//     <div>
//       <h1>Edit {product.name}</h1>
//       <p>Price: {product.price}</p>
//     </div>
//   );
// }