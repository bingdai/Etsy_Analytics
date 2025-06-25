# Shop API v3 Documentation

## Overview

Etsy's Open API v3 is a RESTful API that uses OAuth 2.0 for authentication. The v2 API was officially deprecated on April 3, 2023.

## Authentication

### OAuth 2.0 Flow

Etsy uses OAuth 2.0 Authorization Code Grant with PKCE (Proof Key for Code Exchange) for security.

#### Prerequisites
- Etsy App API Key (from Your Apps dashboard)
- Callback URL with HTTPS/TLS
- Required scopes for your application

#### Flow Steps

1. **Authorization Request**
   ```
   https://www.etsy.com/oauth/connect?
     response_type=code&
     redirect_uri=YOUR_REDIRECT_URI&
     scope=SPACE_SEPARATED_SCOPES&
     client_id=YOUR_API_KEY&
     state=YOUR_STATE&
     code_challenge=YOUR_CODE_CHALLENGE&
     code_challenge_method=S256
   ```

2. **Token Exchange**
   ```
   POST https://api.etsy.com/v3/public/oauth/token
   Content-Type: application/x-www-form-urlencoded
   
   grant_type=authorization_code&
   client_id=YOUR_API_KEY&
   redirect_uri=YOUR_REDIRECT_URI&
   code=AUTH_CODE&
   code_verifier=YOUR_CODE_VERIFIER
   ```

3. **Token Response**
   ```json
   {
     "access_token": "12345678.K4kRtKUMRHfAkdJGdXCgVqSZwPiJLFpSBdiVGuuYgUjRVmAhM",
     "token_type": "Bearer",
     "expires_in": 3600,
     "refresh_token": "12345678.QoraCtqpXwRFSKqtLfAftcXFoZXMrCjJnKeRvHiAZyXPkLwDE"
   }
   ```

### Token Details
- **Access Token**: Valid for 1 hour (3600 seconds)
- **Refresh Token**: Valid for 90 days
- **Format**: User ID prefix + OAuth token (e.g., `12345678.token_string`)

### Request Headers
All v3 API requests require:
```
x-api-key: YOUR_API_KEY
Authorization: Bearer ACCESS_TOKEN
```

## Rate Limits

- **Daily**: 10,000 requests per day
- **Per Second**: 10 requests per second
- Single rate limit per application (not per user)

## Common Endpoints

### Shop Management
- `GET /application/shops/{shop_id}` - Get shop details
- `GET /application/shops/{shop_id}/listings/active` - Get active listings
- `PUT /application/shops/{shop_id}` - Update shop

### Listings
- `GET /application/listings/{listing_id}` - Get listing details
- `POST /application/shops/{shop_id}/listings` - Create listing
- `PUT /application/listings/{listing_id}` - Update listing
- `DELETE /application/listings/{listing_id}` - Delete listing

### Inventory
- `GET /application/listings/{listing_id}/inventory` - Get inventory
- `PUT /application/listings/{listing_id}/inventory` - Update inventory

### Orders (Receipts)
- `GET /application/shops/{shop_id}/receipts` - Get shop receipts
- `GET /application/shops/{shop_id}/transactions` - Get transactions
- `PUT /application/shops/{shop_id}/receipts/{receipt_id}` - Update receipt

### Shipping
- `GET /application/shops/{shop_id}/shipping-profiles` - Get shipping profiles
- `GET /application/shipping-carriers` - Get supported carriers

## Scopes

V3 splits many v2 scopes into separate read and write permissions:

### Common Scopes
- `shops_r` - Read shop data
- `shops_w` - Write shop data
- `listings_r` - Read listings
- `listings_w` - Create/update listings
- `listings_d` - Delete listings
- `transactions_r` - Read orders/receipts
- `transactions_w` - Update orders

## Migration from v2

### Key Changes
- OAuth 2.0 instead of OAuth 1.0
- No direct token conversion
- More granular scopes
- Some endpoint paths changed
- JSON-only responses (no XML)

### Breaking Changes
- Must re-authenticate all users
- Update all endpoint URLs from v2 to v3
- Handle new scope requirements
- Update response parsing for new formats

## Error Handling

### Common Error Codes
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid/expired token)
- `403` - Forbidden (insufficient scopes)
- `404` - Resource not found
- `429` - Rate limit exceeded
- `500` - Internal server error

### Error Response Format
```json
{
  "error": "invalid_request",
  "error_description": "The request is missing a required parameter"
}
```

## Best Practices

1. **Token Management**
   - Store refresh tokens securely
   - Implement automatic token refresh
   - Handle token expiration gracefully

2. **Rate Limiting**
   - Implement exponential backoff
   - Cache responses when possible
   - Batch operations where available

3. **Error Handling**
   - Log all API errors
   - Provide user-friendly error messages
   - Implement retry logic for transient errors

4. **Security**
   - Never expose API keys in client-side code
   - Use HTTPS for all callbacks
   - Validate state parameter in OAuth flow
   - Store tokens encrypted

## Useful Resources

- [Official Documentation](https://developer.etsy.com/documentation/)
- [API Reference](https://developer.etsy.com/documentation/reference/)
- [OAuth Tutorial](https://developers.etsy.com/documentation/tutorials/quickstart/)
- [Migration Guide](https://developer.etsy.com/documentation/migration/)

## Example Implementation Notes

### PKCE Code Generation
```typescript
// Generate code verifier (43-128 characters)
const codeVerifier = base64url(crypto.randomBytes(32));

// Generate code challenge
const codeChallenge = base64url(crypto.createHash('sha256').update(codeVerifier).digest());
```

### Token Storage Schema
```typescript
interface EtsyTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  userId: string;
  shopId: string;
}
```