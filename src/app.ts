import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from "aws-lambda";
import axios, {AxiosRequestConfig, Method} from 'axios'
import * as https from "https";
export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const queries = event.queryStringParameters;
  if (!queries || !queries.hasOwnProperty('url')) {
    return {
      statusCode: 400,
      body: JSON.stringify({message: 'URL is undefined'})
    }
  }
  try {
    const headers = {...event.headers}
    headers['X-Forwarded-Port'] = null
    headers['X-Forwarded-Proto'] = null
    headers['Host'] = null
    const config: AxiosRequestConfig = {
      method: event.httpMethod as Method,
      url: queries.url,
      headers,
      timeout: parseInt(queries.timeout) || 10000,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    }
    const data = await axios(config)
    if (data.headers['set-cookie'])
      data.headers['set-cookie'] = data.headers['set-cookie']
    if (data.headers['transfer-encoding'])
      delete data.headers['transfer-encoding']
    console.log(JSON.stringify(data.headers))
    return {
      statusCode: 200,
      body: data.data,
      headers: data.headers
    }
  } catch (e) {
    console.log(JSON.stringify(e))
    return {
      statusCode: e.response?.status || 500,
      body: e
    }
  }
}
