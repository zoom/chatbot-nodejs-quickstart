/**
 * Validation utilities for Zoom Team Chat webhook payloads and API requests
 */

import crypto from 'crypto';

/**
 * Verify Zoom webhook signature to ensure authenticity
 * @param {Object} req - Express request object
 * @throws {Error} If signature verification fails
 */
export function verifyZoomWebhookSignature(req) {
  const signature = req.headers['x-zm-signature'];
  const timestamp = req.headers['x-zm-request-timestamp'];

  if (!signature || !timestamp) {
    throw new Error('Missing signature headers');
  }

  const message = `v0:${timestamp}:${JSON.stringify(req.body)}`;
  const hash = crypto
    .createHmac('sha256', process.env.ZOOM_VERIFICATION_TOKEN)
    .update(message)
    .digest('hex');

  const expectedSignature = `v0=${hash}`;

  if (signature !== expectedSignature) {
    throw new Error('Invalid webhook signature');
  }
}

/**
 * Validate Zoom webhook payload structure
 * @param {Object} payload - Webhook payload
 * @returns {Object} Validation result
 */
export function validateWebhookPayload(payload) {
  const errors = [];

  if (!payload) {
    return { isValid: false, errors: ['Payload is required'] };
  }

  if (!payload.event) {
    errors.push('Event type is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate message request payload
 * @param {Object} payload - Message request payload
 * @returns {Object} Validation result
 */
export function validateMessagePayload(payload) {
  const errors = [];

  if (!payload) {
    return { isValid: false, errors: ['Payload is required'] };
  }

  if (!payload.to_jid || typeof payload.to_jid !== 'string') {
    errors.push('to_jid is required and must be a string');
  }

  if (!payload.message || typeof payload.message !== 'string') {
    errors.push('message is required and must be a string');
  }

  if (payload.message && payload.message.length > 4096) {
    errors.push('message must be 4096 characters or less');
  }

  if (payload.reply_to && typeof payload.reply_to !== 'string') {
    errors.push('reply_to must be a string if provided');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate required environment variables
 * @returns {Object} Validation result
 */
export function validateEnvironmentVariables() {
  const required = [
    'ZOOM_CLIENT_ID',
    'ZOOM_CLIENT_SECRET',
    'ZOOM_BOT_JID',
    'ZOOM_VERIFICATION_TOKEN',
    'ANTHROPIC_API_KEY'
  ];

  const missing = required.filter(variable => !process.env[variable]);

  return {
    isValid: missing.length === 0,
    missing,
    errors: missing.map(variable => `Missing required environment variable: ${variable}`)
  };
}

/**
 * Sanitize message content to prevent potential issues
 * @param {string} message - Message content
 * @returns {string} Sanitized message
 */
export function sanitizeMessage(message) {
  if (typeof message !== 'string') {
    return '';
  }

  // Basic sanitization - remove/escape potentially problematic characters
  return message
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .substring(0, 4096); // Ensure message length limit
}

/**
 * Validate JID format (basic validation)
 * @param {string} jid - Zoom JID
 * @returns {boolean} Is valid JID format
 */
export function isValidJID(jid) {
  if (typeof jid !== 'string' || !jid.trim()) {
    return false;
  }

  // Basic JID format validation
  // Zoom JIDs typically follow patterns like: user@domain or channel@domain
  const jidPattern = /^[^@\s]+@[^@\s]+$/;
  return jidPattern.test(jid);
}

/**
 * Create validation middleware for Express routes
 * @param {Function} validator - Validation function
 * @returns {Function} Express middleware
 */
export function createValidationMiddleware(validator) {
  return (req, res, next) => {
    const validation = validator(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }

    next();
  };
}