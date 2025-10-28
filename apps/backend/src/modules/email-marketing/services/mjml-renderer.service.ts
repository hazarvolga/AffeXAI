import { Injectable, Logger } from '@nestjs/common';
import mjml2html from 'mjml';

export interface EmailStructure {
  rows: Array<{
    id: string;
    type: string;
    columns: Array<{
      id: string;
      width: string;
      blocks: Array<{
        id: string;
        type: string;
        properties: Record<string, any>;
        styles: Record<string, any>;
      }>;
    }>;
    settings: Record<string, any>;
  }>;
  settings: {
    backgroundColor?: string;
    contentWidth?: string;
    fonts?: string[];
  };
}

@Injectable()
export class MjmlRendererService {
  private readonly logger = new Logger(MjmlRendererService.name);

  /**
   * Convert JSON email structure to MJML markup
   */
  structureToMjml(structure: EmailStructure): string {
    const { rows, settings } = structure;

    const mjmlContent = `
      <mjml>
        <mj-head>
          ${this.renderHead(settings)}
        </mj-head>
        <mj-body ${this.renderBodyAttributes(settings)}>
          ${rows.map((row) => this.renderRow(row)).join('\n')}
        </mj-body>
      </mjml>
    `;

    return mjmlContent;
  }

  /**
   * Convert MJML to HTML
   */
  mjmlToHtml(mjml: string): { html: string; errors: any[] } {
    try {
      const result = mjml2html(mjml, {
        validationLevel: 'soft',
        minify: false,
      });

      return {
        html: result.html,
        errors: result.errors || [],
      };
    } catch (error) {
      this.logger.error('MJML compilation error:', error);
      throw new Error(`MJML compilation failed: ${error.message}`);
    }
  }

  /**
   * Full pipeline: JSON structure → MJML → HTML
   */
  renderEmail(structure: EmailStructure): {
    mjml: string;
    html: string;
    errors: any[];
  } {
    const mjml = this.structureToMjml(structure);
    const { html, errors } = this.mjmlToHtml(mjml);

    return { mjml, html, errors };
  }

  /**
   * Render MJML head section (styles, fonts, meta tags)
   */
  private renderHead(settings: EmailStructure['settings']): string {
    const fonts = settings.fonts || [];

    return `
      <mj-attributes>
        <mj-all font-family="Arial, sans-serif" />
        <mj-text font-size="14px" color="#333333" line-height="1.6" />
        <mj-button font-size="14px" border-radius="4px" />
      </mj-attributes>
      ${fonts.map((font) => `<mj-font name="${font}" href="https://fonts.googleapis.com/css?family=${font}" />`).join('\n')}
      <mj-style>
        .link { color: #0066cc; text-decoration: none; }
        .link:hover { text-decoration: underline; }
      </mj-style>
    `;
  }

  /**
   * Render body attributes
   */
  private renderBodyAttributes(settings: EmailStructure['settings']): string {
    const attrs: string[] = [];

    if (settings.backgroundColor) {
      attrs.push(`background-color="${settings.backgroundColor}"`);
    }
    if (settings.contentWidth) {
      attrs.push(`width="${settings.contentWidth}"`);
    }

    return attrs.join(' ');
  }

  /**
   * Render a single row (section)
   */
  private renderRow(row: EmailStructure['rows'][0]): string {
    const { columns, settings } = row;

    const sectionAttrs = this.renderSectionAttributes(settings);

    return `
      <mj-section ${sectionAttrs}>
        ${columns.map((col) => this.renderColumn(col)).join('\n')}
      </mj-section>
    `;
  }

  /**
   * Render section attributes
   */
  private renderSectionAttributes(settings: Record<string, any>): string {
    const attrs: string[] = [];

    if (settings.backgroundColor) {
      attrs.push(`background-color="${settings.backgroundColor}"`);
    }
    if (settings.paddingTop) {
      attrs.push(`padding-top="${settings.paddingTop}"`);
    }
    if (settings.paddingBottom) {
      attrs.push(`padding-bottom="${settings.paddingBottom}"`);
    }

    return attrs.join(' ');
  }

  /**
   * Render a column
   */
  private renderColumn(column: EmailStructure['rows'][0]['columns'][0]): string {
    const { width, blocks } = column;

    return `
      <mj-column width="${width}">
        ${blocks.map((block) => this.renderBlock(block)).join('\n')}
      </mj-column>
    `;
  }

  /**
   * Render a block based on its type
   */
  private renderBlock(block: EmailStructure['rows'][0]['columns'][0]['blocks'][0]): string {
    const { type, properties, styles } = block;

    switch (type) {
      case 'heading':
        return this.renderHeading(properties, styles);
      case 'text':
        return this.renderText(properties, styles);
      case 'button':
        return this.renderButton(properties, styles);
      case 'image':
        return this.renderImage(properties, styles);
      case 'divider':
        return this.renderDivider(properties, styles);
      case 'spacer':
        return this.renderSpacer(properties, styles);
      case 'html':
        return this.renderHtml(properties);
      default:
        this.logger.warn(`Unknown block type: ${type}`);
        return '';
    }
  }

  private renderHeading(props: Record<string, any>, styles: Record<string, any>): string {
    const attrs = this.buildAttributes({
      'font-size': styles.fontSize || '24px',
      'font-weight': styles.fontWeight || 'bold',
      'color': styles.color || '#333333',
      'align': props.align || 'left',
      'padding': styles.padding || '10px 0',
    });

    return `<mj-text ${attrs}>${props.text || ''}</mj-text>`;
  }

  private renderText(props: Record<string, any>, styles: Record<string, any>): string {
    const attrs = this.buildAttributes({
      'font-size': styles.fontSize || '14px',
      'color': styles.color || '#333333',
      'align': props.align || 'left',
      'padding': styles.padding || '10px 0',
      'line-height': styles.lineHeight || '1.6',
    });

    return `<mj-text ${attrs}>${props.text || ''}</mj-text>`;
  }

  private renderButton(props: Record<string, any>, styles: Record<string, any>): string {
    const attrs = this.buildAttributes({
      'background-color': styles.backgroundColor || '#0066cc',
      'color': styles.color || '#ffffff',
      'font-size': styles.fontSize || '14px',
      'font-weight': styles.fontWeight || 'bold',
      'border-radius': styles.borderRadius || '4px',
      'padding': styles.padding || '12px 24px',
      'align': props.align || 'left',
      'href': props.href || '#',
    });

    return `<mj-button ${attrs}>${props.text || 'Click here'}</mj-button>`;
  }

  private renderImage(props: Record<string, any>, styles: Record<string, any>): string {
    const attrs = this.buildAttributes({
      'src': props.src || '',
      'alt': props.alt || '',
      'width': styles.width || 'auto',
      'align': props.align || 'center',
      'padding': styles.padding || '10px 0',
    });

    if (props.href) {
      attrs.push(`href="${props.href}"`);
    }

    return `<mj-image ${attrs.join(' ')} />`;
  }

  private renderDivider(props: Record<string, any>, styles: Record<string, any>): string {
    const attrs = this.buildAttributes({
      'border-color': styles.borderColor || '#dddddd',
      'border-width': styles.borderWidth || '1px',
      'padding': styles.padding || '10px 0',
    });

    return `<mj-divider ${attrs} />`;
  }

  private renderSpacer(props: Record<string, any>, styles: Record<string, any>): string {
    const height = styles.height || '20px';
    return `<mj-spacer height="${height}" />`;
  }

  private renderHtml(props: Record<string, any>): string {
    return `<mj-raw>${props.html || ''}</mj-raw>`;
  }

  /**
   * Helper: Build attribute string from object
   */
  private buildAttributes(attrs: Record<string, string>): string[] {
    return Object.entries(attrs)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}="${value}"`);
  }
}
