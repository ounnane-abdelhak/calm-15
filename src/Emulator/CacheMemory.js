class CacheMemory {
    constructor() {
        // Initialize cache with 16 entries (4-way set associative)
        this.cache = [];
        this.sets = 4;
        this.ways = 4;
        this.cacheSize = this.sets * this.ways;
        
        // Initialize cache entries
        for (let i = 0; i < this.cacheSize; i++) {
            this.cache.push({
                valid: false,
                tag: 0,
                data: 0,
                lastAccess: 0
            });
        }
        
        // Initialize timestamp for LRU
        this.timestamp = 0;
    }

    // Convert address to binary and split into tag and index
    getAddressComponents(address) {
        const binaryAddr = address.toString(2).padStart(16, '0');
        const tag = binaryAddr.substring(0, 8);
        const index = binaryAddr.substring(8, 12);
        return {
            tag: parseInt(tag, 2),
            index: parseInt(index, 2)
        };
    }

    // Check if address is in cache
    checkCache(address) {
        const { tag, index } = this.getAddressComponents(address);
        const startIndex = index * this.ways;
        
        for (let i = 0; i < this.ways; i++) {
            const entry = this.cache[startIndex + i];
            if (entry.valid && entry.tag === tag) {
                // Update last access time
                entry.lastAccess = this.timestamp++;
                return true;
            }
        }
        return false;
    }

    // Read from cache
    readFromCache(address) {
        const { tag, index } = this.getAddressComponents(address);
        const startIndex = index * this.ways;
        
        for (let i = 0; i < this.ways; i++) {
            const entry = this.cache[startIndex + i];
            if (entry.valid && entry.tag === tag) {
                return entry.data;
            }
        }
        return null; // Should never reach here if checkCache returned true
    }

    // Update cache
    updateCache(address, data) {
        const { tag, index } = this.getAddressComponents(address);
        const startIndex = index * this.ways;
        
        // Find invalid entry or least recently used entry
        let bestEntryIndex = startIndex;
        let bestEntry = this.cache[startIndex];
        
        for (let i = 1; i < this.ways; i++) {
            const entry = this.cache[startIndex + i];
            if (!entry.valid) {
                bestEntryIndex = startIndex + i;
                break;
            } else if (entry.lastAccess < bestEntry.lastAccess) {
                bestEntryIndex = startIndex + i;
                bestEntry = entry;
            }
        }
        
        // Update the entry
        this.cache[bestEntryIndex] = {
            valid: true,
            tag: tag,
            data: data,
            lastAccess: this.timestamp++
        };
    }

    // Clear cache
    clearCache() {
        for (let i = 0; i < this.cacheSize; i++) {
            this.cache[i] = {
                valid: false,
                tag: 0,
                data: 0,
                lastAccess: 0
            };
        }
        this.timestamp = 0;
    }

    // Get cache statistics
    getStatistics() {
        let hits = 0;
        let misses = 0;
        
        for (let i = 0; i < this.cacheSize; i++) {
            if (this.cache[i].valid) {
                hits++;
            } else {
                misses++;
            }
        }
        
        return {
            hits,
            misses,
            hitRate: hits / (hits + misses) * 100 || 0
        };
    }
}

// Export the CacheMemory class
export default CacheMemory;
