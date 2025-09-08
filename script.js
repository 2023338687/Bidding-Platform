const auctions = [
    {
        id: 1,
        title: "Vintage Rolex Submariner",
        description: "1960s Rolex Submariner in excellent condition with original box and papers.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        currentPrice: 12500,
        startingPrice: 10000,
        bids: 12,
        endTime: "2023-12-15T18:00:00",
        seller: "VintageWatches",
        sellerRating: 4.9
    },
    {
        id: 2,
        title: "Original Picasso Sketch",
        description: "Authentic pencil sketch by Pablo Picasso from his Blue Period.",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        currentPrice: 75000,
        startingPrice: 50000,
        bids: 8,
        endTime: "2023-12-10T14:30:00",
        seller: "ArtCollector",
        sellerRating: 4.8
    },
    {
        id: 3,
        title: "1967 Ford Mustang",
        description: "Fully restored 1967 Ford Mustang Fastback with original 289 V8 engine.",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        currentPrice: 65000,
        startingPrice: 60000,
        bids: 5,
        endTime: "2023-12-20T12:00:00",
        seller: "ClassicCars",
        sellerRating: 4.7
    },
    {
        id: 4,
        title: "Rare First Edition Harry Potter",
        description: "First edition, first printing of Harry Potter and the Philosopher's Stone.",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        currentPrice: 25000,
        startingPrice: 20000,
        bids: 15,
        endTime: "2023-12-12T16:45:00",
        seller: "BookCollector",
        sellerRating: 4.9
    }
];


const auctionGrid = document.getElementById('auctionGrid');
const auctionModal = document.getElementById('auctionModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');


document.addEventListener('DOMContentLoaded', () => {
    displayAuctions();
});


function displayAuctions() {
    auctionGrid.innerHTML = '';
    
    auctions.forEach(auction => {
        const auctionItem = document.createElement('div');
        auctionItem.className = 'auction-item';
        auctionItem.innerHTML = `
            <div class="auction-image">
                <img src="${auction.image}" alt="${auction.title}">
            </div>
            <div class="auction-details">
                <h3 class="auction-title">${auction.title}</h3>
                <p class="auction-description">${auction.description.substring(0, 60)}...</p>
                <p class="auction-price">$${auction.currentPrice.toLocaleString()}</p>
                <div class="auction-time">
                    <span>${auction.bids} bids</span>
                    <span class="time-left">${formatTimeLeft(auction.endTime)} left</span>
                </div>
            </div>
        `;
        
        auctionItem.addEventListener('click', () => openAuctionModal(auction));
        auctionGrid.appendChild(auctionItem);
    });
}


function formatTimeLeft(endTime) {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end - now;
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
}


function openAuctionModal(auction) {
    modalBody.innerHTML = `
        <div class="modal-auction-image-container">
            <img src="${auction.image}" alt="${auction.title}" class="modal-auction-image">
            <button class="btn-secondary" style="margin-top: 15px;"><i class="fas fa-vr-cardboard"></i> View in AR</button>
        </div>
        <div class="modal-auction-info">
            <h2 class="modal-auction-title">${auction.title}</h2>
            <p class="modal-auction-description">${auction.description}</p>
            <div class="modal-auction-meta">
                <p><strong>Seller:</strong> ${auction.seller} (${auction.sellerRating}★)</p>
                <p><strong>Starting Price:</strong> $${auction.startingPrice.toLocaleString()}</p>
                <p class="modal-auction-price">Current Bid: $${auction.currentPrice.toLocaleString()}</p>
                <p><strong>Time Left:</strong> ${formatTimeLeft(auction.endTime)}</p>
            </div>
            
            <div class="bid-section">
                <h3>Place a Bid</h3>
                <p>Enter your bid amount (minimum bid: $${(auction.currentPrice + 100).toLocaleString()})</p>
                <form class="bid-form">
                    <input type="number" min="${auction.currentPrice + 100}" step="100" placeholder="Your bid amount">
                    <button type="submit" class="btn-primary">Place Bid</button>
                </form>
            </div>
            
            <div class="bid-history">
                <h3>Bid History</h3>
                <div class="bid-item">
                    <span><strong>Bidder123</strong></span>
                    <span>$${(auction.currentPrice - 500).toLocaleString()}</span>
                    <span>2 hours ago</span>
                </div>
                <div class="bid-item">
                    <span><strong>Collector456</strong></span>
                    <span>$${(auction.currentPrice - 1000).toLocaleString()}</span>
                    <span>5 hours ago</span>
                </div>
                <div class="bid-item">
                    <span><strong>Investor789</strong></span>
                    <span>$${auction.startingPrice.toLocaleString()}</span>
                    <span>1 day ago</span>
                </div>
            </div>
            
            <div class="ai-suggestion" style="margin-top: 20px; padding: 15px; background-color: #f0f8ff; border-radius: 8px;">
                <h4><i class="fas fa-robot"></i> AI Price Prediction</h4>
                <p>Based on similar items sold recently, we estimate this item could sell for between $${(auction.currentPrice * 1.1).toLocaleString()} and $${(auction.currentPrice * 1.3).toLocaleString()}.</p>
            </div>
        </div>
    `;
    
   
    const bidForm = modalBody.querySelector('.bid-form');
    bidForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const bidInput = bidForm.querySelector('input');
        const bidAmount = parseFloat(bidInput.value);
        
        if (bidAmount >= auction.currentPrice + 100) {
            alert(`Bid of $${bidAmount.toLocaleString()} placed successfully!`);
            
            auction.currentPrice = bidAmount;
            auction.bids += 1;
            closeModal.click();
            displayAuctions();
        } else {
            alert(`Bid must be at least $${(auction.currentPrice + 100).toLocaleString()}`);
        }
    });
    
    auctionModal.style.display = 'block';
}


closeModal.addEventListener('click', () => {
    auctionModal.style.display = 'none';
});


window.addEventListener('click', (e) => {
    if (e.target === auctionModal) {
        auctionModal.style.display = 'none';
    }
});

setInterval(() => {
    const timeElements = document.querySelectorAll('.time-left');
    timeElements.forEach(el => {
        const auctionId = parseInt(el.closest('.auction-item').dataset.id);
        const auction = auctions.find(a => a.id === auctionId);
        if (auction) {
            el.textContent = formatTimeLeft(auction.endTime);
        }
    });
}, 60000);