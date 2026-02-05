import bcrypt from 'bcryptjs'

// Salt rounds for bcrypt hashing (higher = more secure but slower)
const SALT_ROUNDS = 12

/**
 * Hash a password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password
 */
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hash = await bcrypt.hash(password, salt)
    return hash
  } catch (error) {
    console.error('Error hashing password:', error)
    throw new Error('Failed to hash password')
  }
}

/**
 * Verify a password against its hash
 * @param {string} password - Plain text password to verify
 * @param {string} hash - Hashed password to compare against
 * @returns {Promise<boolean>} - True if password matches, false otherwise
 */
export async function verifyPassword(password, hash) {
  try {
    const isValid = await bcrypt.compare(password, hash)
    return isValid
  } catch (error) {
    console.error('Error verifying password:', error)
    throw new Error('Failed to verify password')
  }
}

/**
 * Create a session token for admin authentication
 * @param {object} admin - Admin user object
 * @returns {string} - Session token
 */
export function createSessionToken(admin) {
  // Simple token creation (in production, use JWT)
  const tokenData = {
    id: admin.id,
    email: admin.email,
    role: admin.role,
    timestamp: Date.now()
  }
  
  // Convert to base64 (simple encoding, not encryption)
  return Buffer.from(JSON.stringify(tokenData)).toString('base64')
}

/**
 * Verify a session token
 * @param {string} token - Session token to verify
 * @returns {object|null} - Decoded token data or null if invalid
 */
export function verifySessionToken(token) {
  try {
    // Decode base64 token
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const tokenData = JSON.parse(decoded)
    
    // Check if token is not too old (24 hours)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    if (Date.now() - tokenData.timestamp > maxAge) {
      return null
    }
    
    return tokenData
  } catch (error) {
    console.error('Error verifying session token:', error)
    return null
  }
}
