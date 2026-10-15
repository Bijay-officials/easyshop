const fs = require('fs');
let content = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf-8');

// Add guestName state
content = content.replace(
  "const [comment, setComment] = useState('');",
  "const [comment, setComment] = useState('');\n  const [guestName, setGuestName] = useState('');"
);

// Update submitReview
const submitReviewOld = `  const submitReview = async (e: import('react').FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate(\`/login?redirect=/product/\${id}\`);
      return;
    }
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        userId: user.id,
        userName: user.name,
        rating,
        comment
      })
    });
    if (res.ok) {
      const newReview = await res.json();
      setReviews([...reviews, newReview]);
      setComment('');
      setRating(5);
    }
  };`;

const submitReviewNew = `  const submitReview = async (e: import('react').FormEvent) => {
    e.preventDefault();
    
    const reviewerName = user ? user.name : (guestName || 'Guest');
    const reviewerId = user ? user.id : 'guest_' + Date.now();

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        userId: reviewerId,
        userName: reviewerName,
        rating,
        comment
      })
    });
    if (res.ok) {
      const newReview = await res.json();
      setReviews([...reviews, newReview]);
      setComment('');
      setGuestName('');
      setRating(5);
    }
  };`;
content = content.replace(submitReviewOld, submitReviewNew);

// Update the review form part
const formOld = `{user ? (
          <form onSubmit={submitReview} className="mb-8 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-sm font-semibold mb-3">{lang === 'ja' ? 'レビューを書く' : 'Write a Review'}</h3>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">{lang === 'ja' ? '評価' : 'Rating'}</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(star => (
                  <button type="button" key={star} onClick={() => setRating(star)}>
                    <Star className={\`w-5 h-5 \${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}\`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">{lang === 'ja' ? 'コメント' : 'Comment'}</label>
              <textarea 
                required 
                className="w-full border border-[#D1D5DB] rounded p-2 text-sm outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                rows={3} 
                value={comment} 
                onChange={e => setComment(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="bg-[#2563EB] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#1D4ED8]">{lang === 'ja' ? '投稿する' : 'Submit'}</button>
          </form>
        ) : (
          <div className="mb-8 text-sm text-gray-500">
            <Link to={\`/login?redirect=/product/\${id}\`} className="text-blue-600 hover:underline">{lang === 'ja' ? 'ログイン' : 'Log in'}</Link> {lang === 'ja' ? 'してレビューを書く' : 'to write a review.'}
          </div>
        )}`;

const formNew = `<form onSubmit={submitReview} className="mb-8 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-sm font-semibold mb-3">{lang === 'ja' ? 'レビューを書く' : 'Write a Review'}</h3>
            {!user && (
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">{lang === 'ja' ? 'お名前 (ゲスト)' : 'Name (Guest)'}</label>
                <input 
                  type="text" 
                  required
                  className="w-full border border-[#D1D5DB] rounded p-2 text-sm outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  placeholder={lang === 'ja' ? 'ゲスト' : 'Guest'}
                />
              </div>
            )}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">{lang === 'ja' ? '評価' : 'Rating'}</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(star => (
                  <button type="button" key={star} onClick={() => setRating(star)}>
                    <Star className={\`w-5 h-5 \${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}\`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">{lang === 'ja' ? 'コメント' : 'Comment'}</label>
              <textarea 
                required 
                className="w-full border border-[#D1D5DB] rounded p-2 text-sm outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                rows={3} 
                value={comment} 
                onChange={e => setComment(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="bg-[#2563EB] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#1D4ED8]">{lang === 'ja' ? '投稿する' : 'Submit'}</button>
          </form>`;

content = content.replace(formOld, formNew);
fs.writeFileSync('src/pages/ProductDetail.tsx', content);
console.log('Reviews updated');
